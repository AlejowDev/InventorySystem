// routes/adminRoutes.js
const express = require('express');
const { registerUserByAdmin } = require('../controllers/adminController');

const router = express.Router();

// Ruta para el registro de usuarios por admin
router.post('/register', registerUserByAdmin);

module.exports = router;
