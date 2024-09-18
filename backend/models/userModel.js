// models/userModel.js

const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const query = "INSERT INTO users (document, name, username, password, role) VALUES (?, ?, ?, ?, ?)";
        db.query(query, [userData.document, userData.name, userData.username, userData.password, userData.role], callback);
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
        const query = "UPDATE users SET name = ?, username = ?, role = ? WHERE document = ?";
        db.query(query, [userData.name, userData.username, userData.role, document], callback);
    }
};

module.exports = User;
