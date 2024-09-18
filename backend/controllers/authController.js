const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registro de usuario
exports.register = (req, res) => {
    const { document, name, username, password } = req.body;
    const role = 'student';  // Asigna el rol por defecto como 'student'

    // Encriptar contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error en el servidor" });

        const newUser = {
            document,
            name,
            username,
            password: hashedPassword,
            role  // Usa el rol por defecto
        };

        // Guardar usuario
        User.create(newUser, (error, result) => {
            if (error) return res.status(500).json({ message: "Error al crear el usuario" });
            res.status(201).json({ message: "Usuario registrado con éxito" });
        });
    });
};

// Inicio de sesión
exports.login = (req, res) => {
const { username, password } = req.body;

User.findByUsername(username, (error, users) => {
    if (error || users.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const user = users[0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // Enviar rol y token
        res.status(200).json({ token: 'example-token', role: user.role });
    });
});
};


