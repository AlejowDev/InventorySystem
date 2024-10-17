const db = require("../config/db");

const Loan = {
  create: (loanData, callback) => {
    const sqlLoan =
      "INSERT INTO loans (receivingUser, moderator, loanDate, deliveryDate, approval, state) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      sqlLoan,
      [
        loanData.receivingUser,
        loanData.moderator,
        loanData.loanDate,
        loanData.deliveryDate,
        loanData.approval,
        loanData.state,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting into loans:", err);
          return callback(err);
        }

        const loanId = result.insertId; // Obtener el ID del préstamo recién creado

        const devices = loanData.devices || []; // Array de seriales de dispositivos
        if (devices.length > 0) {
          // Construimos una consulta para obtener los nombres de los dispositivos
          const sqlGetDeviceNames = `
            SELECT serial, nombre FROM tools WHERE serial IN (?)
          `;

          db.query(sqlGetDeviceNames, [devices], (err, deviceResults) => {
            if (err) {
              console.error("Error fetching device names:", err);
              return callback(err);
            }

            // Creamos un mapa de dispositivos para facilitar la búsqueda
            const deviceMap = {};
            deviceResults.forEach((device) => {
              deviceMap[device.serial] = device.nombre;
            });

            // Preparamos los valores para la inserción en loan_devices
            const sqlDevices =
              "INSERT INTO loan_devices (loan_id, device_serial, device_name) VALUES ?";
            const values = devices.map((deviceSerial) => [
              loanId,
              deviceSerial,
              deviceMap[deviceSerial] || null, // Asignamos el nombre del dispositivo o null si no se encontró
            ]);

            db.query(sqlDevices, [values], (err) => {
              if (err) {
                console.error("Error inserting into loan_devices:", err);
                return callback(err);
              }
              callback(null, result);
            });
          });
        } else {
          callback(null, result);
        }
      }
    );
  },

  findAll: (callback) => {
    const query = `
  SELECT 
    loans.id, 
    loans.loanDate, 
    loans.deliveryDate, 
    loans.approval, 
    loans.state,
    GROUP_CONCAT(loan_devices.device_serial) AS devices,
    GROUP_CONCAT(loan_devices.device_name) AS deviceNames, 
    receivingUser.document AS receivingUser, 
    receivingUser.name AS receivingUserName,
    receivingUser.phone AS receivingUserPhone,
    receivingUser.studentNumber AS receivingUserStudentNumber -- Corrige aquí el campo correcto en vez de repetir phone
  FROM loans
  LEFT JOIN loan_devices ON loans.id = loan_devices.loan_id
  JOIN users AS receivingUser ON loans.receivingUser = receivingUser.document
  GROUP BY loans.id;
`;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching loans:", err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  delete: (id, callback) => {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      const deleteDevicesSql = "DELETE FROM loan_devices WHERE loan_id = ?";
      db.query(deleteDevicesSql, [id], (err, result) => {
        if (err) {
          return db.rollback(() => callback(err)); // Rollback en caso de error
        }

        const deleteLoanSql = "DELETE FROM loans WHERE id = ?";
        db.query(deleteLoanSql, [id], (err, result) => {
          if (err) {
            return db.rollback(() => callback(err)); // Rollback en caso de error
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => callback(err)); // Rollback en caso de error
            }
            callback(null, result); // Operación exitosa
          });
        });
      });
    });
  },

  update: (id, loanData, callback) => {
    const sql = "UPDATE loans SET approval = ?, state = ? WHERE id = ?";

    db.query(
      sql,
      [
        loanData.approval,
        loanData.state,
        id, // ID del préstamo a actualizar
      ],
      (err, result) => {
        if (err) return callback(err);

        // Verificamos si el estado actualizado es "Ocupado" o "Disponible"
        let sqlUpdateDeviceState = "";
        if (loanData.state === "Ocupado") {
          // Actualizar el estado del dispositivo a "Ocupado"
          sqlUpdateDeviceState = `
            UPDATE tools 
            SET estado = 'Ocupado' 
            WHERE serial IN (
              SELECT device_serial FROM loan_devices WHERE loan_id = ?
            )
          `;
        } else if (loanData.state === "Disponible") {
          // Actualizar el estado del dispositivo a "Disponible"
          sqlUpdateDeviceState = `
            UPDATE tools 
            SET estado = 'Disponible' 
            WHERE serial IN (
              SELECT device_serial FROM loan_devices WHERE loan_id = ?
            )
          `;
        }

        // Ejecutar la actualización del estado del dispositivo si se definió una consulta
        if (sqlUpdateDeviceState) {
          db.query(sqlUpdateDeviceState, [id], (err) => {
            if (err) {
              return callback(err); // Devolver error si falla la actualización
            }
            callback(null, result); // Llamar callback si todo fue exitoso
          });
        } else {
          callback(null, result); // Si no es "Ocupado" ni "Disponible", solo llamamos al callback
        }
      }
    );
  },
};

module.exports = Loan;
