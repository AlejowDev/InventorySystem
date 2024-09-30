const db = require('../config/db');

const Tool = {
    create: (toolData, callback) => {
        const sql = 'INSERT INTO tools (serial, nombre, descripcion, imagen) VALUES (?, ?, ?, ?)';
        db.query(sql, [toolData.serial, toolData.nombre, toolData.descripcion, toolData.imagen], callback);
    },
    findAll: (callback) => {
        const query = "SELECT * FROM tools";
        db.query(query, callback);
    },
    findById: (serial, callback) => {
        const query = "SELECT * FROM tools WHERE serial = ?";
        db.query(query, [serial], callback);
    },
    update: (serial, toolData, callback) => {
        const query = "UPDATE tools SET nombre = ?, descripcion = ?, imagen = ? WHERE serial = ?";
        db.query(query, [toolData.nombre, toolData.descripcion, toolData.imagen, serial], callback);
    },
    delete: (serial, callback) => {
        const query = "DELETE FROM tools WHERE serial = ?";
        db.query(query, [serial], callback);
    }
};

module.exports = Tool;
