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
        const query = "SELECT * FROM users WHERE document != 1022932004";
        db.query(query, callback);
    }
};

module.exports = User;
