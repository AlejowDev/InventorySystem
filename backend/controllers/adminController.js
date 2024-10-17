// controllers/adminController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registro de usuario por admin
exports.registerUserByAdmin = (req, res) => {
    const { document, name, email, phone, studentNumber, username, password, role } = req.body;

    if (!role || !['student', 'moderator', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Rol no válido' });
    }

    // Encriptar contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error en el servidor" });

        const newUser = {
            document,
            name,
            email,
            phone,
            studentNumber,
            username,
            password: hashedPassword,
            role,
            isTemporaryPassword: 1 // Establecer isTemporaryPassword a 1
        };

        // Guardar usuario
        User.create(newUser, (error, result) => {
            if (error) return res.status(500).json({ message: "Error al crear el usuario" });
            res.status(201).json({ message: "Usuario registrado con éxito" });
        });
    });
};
