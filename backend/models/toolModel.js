const db = require('../config/db');

const Tool = {
    create: (toolData, callback) => {
        const sql = 'INSERT INTO tools (serial, nombre, descripcion, imagen, estado) VALUES (?, ?, ?, ?, ?)';
        // Agregamos "Disponible" como el valor por defecto para el estado
        db.query(sql, [toolData.serial, toolData.nombre, toolData.descripcion, toolData.imagen, "Disponible"], callback);
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
        let query = "UPDATE tools SET nombre = ?, descripcion = ?";
        const params = [toolData.nombre, toolData.descripcion, serial];
    
        if (toolData.imagen) {
            query += ", imagen = ?";
            params.splice(2, 0, toolData.imagen); // Insertamos la imagen en la tercera posición de los parámetros
        }
    
        query += " WHERE serial = ?";
        db.query(query, params, callback);
    },    
    delete: (serial, callback) => {
        const query = "DELETE FROM tools WHERE serial = ?";
        db.query(query, [serial], callback);
    }
};

module.exports = Tool;
