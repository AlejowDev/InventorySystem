// models/userModel.js

const db = require("../config/db");

const User = {
  create: (userData, callback) => {
    // Modificar la consulta para incluir el campo isTemporaryPassword
    const query =
      "INSERT INTO users (document, name, email, phone, studentNumber, username, password, role, isTemporaryPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        userData.document,
        userData.name,
        userData.email,
        userData.phone,
        userData.studentNumber,
        userData.username,
        userData.password,
        userData.role,
        userData.isTemporaryPassword,
      ],
      callback
    );
  },

  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], callback);
  },

  findAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },

  delete: (document, callback) => {
    const query = "DELETE FROM users WHERE document = ?";
    db.query(query, [document], callback);
  },

  update: (document, userData, callback) => {
    const query =
      "UPDATE users SET name = ?, username = ?, email = ?, phone = ?, studentNumber = ?, role = ? WHERE document = ?";
    db.query(
      query,
      [userData.name, userData.username, userData.email, userData.phone, userData.studentNumber, userData.role, document],
      callback
    );
  },

  updatePassword: (document, hashedPassword, callback) => {
    // Actualizar la contraseña del usuario utilizando document en lugar de id
    const query =
      "UPDATE users SET password = ?, isTemporaryPassword = 0 WHERE document = ?";
    db.query(query, [hashedPassword, document], callback);
  },
};

module.exports = User;
