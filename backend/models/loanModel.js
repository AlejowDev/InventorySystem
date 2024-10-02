//loanModel.js

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
    const query = "SELECT * FROM loans"; // Asegúrate de que el nombre de la tabla sea correcto
    db.query(query, callback);
  },
};

module.exports = Loan;
