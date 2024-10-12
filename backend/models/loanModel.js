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
        if (err) return callback(err);

        const loanId = result.insertId; // Obtener el ID del préstamo recién creado

        // Ahora insertamos los dispositivos en la tabla loan_devices
        const devices = loanData.devices; // Asumimos que es un array de seriales
        const sqlDevices =
          "INSERT INTO loan_devices (loan_id, device_serial) VALUES ?";
        const values = devices.map((device) => [loanId, device]);

        db.query(sqlDevices, [values], (err, result) => {
          if (err) return callback(err);
          callback(null, result);
        });
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
        GROUP_CONCAT(loan_devices.device_serial) AS devices, -- Aquí obtenemos los dispositivos asociados
        receivingUser.document AS receivingUser, 
        receivingUser.name AS receivingUserName,
        moderatorUser.document AS moderator, 
        moderatorUser.name AS moderatorName
      FROM loans
      JOIN loan_devices ON loans.id = loan_devices.loan_id -- Relacionamos la tabla de dispositivos
      JOIN users AS receivingUser ON loans.receivingUser = receivingUser.document
      JOIN users AS moderatorUser ON loans.moderator = moderatorUser.document
      GROUP BY loans.id;
    `;
    db.query(query, callback);
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
