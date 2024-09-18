// src/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', register);

// Ruta para el inicio de sesión de usuarios
router.post('/login', login);

module.exports = router;
