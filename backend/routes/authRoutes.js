// authRoutes.js

const express = require('express');
const { register, login, changePassword } = require('../controllers/authController');

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', register);

// Ruta para el inicio de sesión de usuarios
router.post('/login', login);

// Ruta para cambiar la contraseña
router.post('/change-password', changePassword); // Nueva ruta para cambiar la contraseña

module.exports = router;
