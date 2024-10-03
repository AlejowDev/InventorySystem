const db = require("../config/db");

const Loan = {
  create: (loanData, callback) => {
    const sql =
      "INSERT INTO loans (device, receivingUser, moderator, loanDate, deliveryDate, approval, state) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        loanData.device,
        loanData.receivingUser,
        loanData.moderator,
        loanData.loanDate,
        loanData.deliveryDate,
        loanData.approval,
        loanData.state,
      ],
      callback
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
        tools.serial AS device,
        tools.nombre AS deviceName,
        receivingUser.document AS receivingUser, 
        receivingUser.name AS receivingUserName,
        moderatorUser.document AS moderator, 
        moderatorUser.name AS moderatorName
      FROM loans
      JOIN tools ON loans.device = tools.serial
      JOIN users AS receivingUser ON loans.receivingUser = receivingUser.document
      JOIN users AS moderatorUser ON loans.moderator = moderatorUser.document;
    `;
    db.query(query, callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM loans WHERE id = ?";
    db.query(sql, [id], callback);
  },
  update: (id, loanData, callback) => { // Método para actualizar un préstamo
    const sql =
      "UPDATE loans SET approval = ?, state = ? WHERE id = ?";
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
