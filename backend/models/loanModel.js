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
            deviceResults.forEach(device => {
              deviceMap[device.serial] = device.nombre;
            });

            // Preparamos los valores para la inserción en loan_devices
            const sqlDevices =
              "INSERT INTO loan_devices (loan_id, device_serial, device_name) VALUES ?";
            const values = devices.map((deviceSerial) => [
              loanId,
              deviceSerial,
              deviceMap[deviceSerial] || null // Asignamos el nombre del dispositivo o null si no se encontró
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
        GROUP_CONCAT(loan_devices.device_name) AS deviceNames, -- Usar device_name
        receivingUser.document AS receivingUser, 
        receivingUser.name AS receivingUserName,
        moderatorUser.document AS moderator, 
        moderatorUser.name AS moderatorName
      FROM loans
      LEFT JOIN loan_devices ON loans.id = loan_devices.loan_id
      JOIN users AS receivingUser ON loans.receivingUser = receivingUser.document
      JOIN users AS moderatorUser ON loans.moderator = moderatorUser.document
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
    const sql = "DELETE FROM loans WHERE id = ?";
    db.query(sql, [id], callback);
  },

  update: (id, loanData, callback) => {
    // Método para actualizar un préstamo
    const sql = "UPDATE loans SET approval = ?, state = ? WHERE id = ?";
    db.query(
      sql,
      [
        loanData.approval,
        loanData.state,
        id, // ID del préstamo a actualizar
      ],
      callback
    );
  },
};

module.exports = Loan;
