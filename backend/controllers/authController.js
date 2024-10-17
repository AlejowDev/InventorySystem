// authController.js

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Importa jsonwebtoken
require("dotenv").config(); // Asegúrate de que dotenv esté configurado

// Registro de usuario
exports.register = (req, res) => {
  const {
    document,
    name,
    email,
    phone,
    studentNumber,
    username,
    password,
    isTemporaryPassword = 0,
  } = req.body; // Agregar el campo isTemporaryPassword
  const role = "student"; // Asigna el rol por defecto como 'student'

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
      isTemporaryPassword, // Usar el campo de la solicitud
    };

    // Guardar usuario
    User.create(newUser, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error al crear el usuario" });
      res.status(201).json({ message: "Usuario registrado con éxito" });
    });
  });
};

// Inicio de sesión
exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (error, users) => {
    if (error || users.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const user = users[0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch)
        return res.status(401).json({ message: "Contraseña incorrecta" });

      // Generar token JWT
      const token = jwt.sign(
        { id: user.document, role: user.role }, // Información del payload
        process.env.JWT_SECRET, // Usa la clave secreta del archivo .env
        { expiresIn: "1h" } // Establece el tiempo de expiración del token
      );

      // Enviar rol, token y verificar contraseña temporal
      res.status(200).json({
        token,
        role: user.role,
        document: user.document, // Agregar el documento a la respuesta
        isTemporaryPassword: user.isTemporaryPassword, // Asegúrate de que este campo esté presente en tu modelo
      });
    });
  });
};

// Cambio de contraseña
exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Acceso no autorizado" });
    }

    // Verificar el token y obtener el usuario
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      const userDocument = decoded.id; // Obtener el documento del usuario desde el token

      // Encriptar nueva contraseña
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err); // Log del error
          return res.status(500).json({ message: "Error en el servidor" });
        }

        // Actualizar la contraseña del usuario en la base de datos usando el document
        User.updatePassword(userDocument, hashedPassword, (updateError) => {
          if (updateError) {
            console.error(updateError); // Log del error
            return res.status(500).json({ message: "Error al actualizar la contraseña" });
          }

          res.status(200).json({ message: "Contraseña actualizada con éxito" });
        });
      });
    });
  } catch (err) {
    console.error(err); // Log del error
    res.status(500).json({ message: "Error en el servidor" });
  }
};
