// loansRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllLoans,
    createLoan,
    // Otras funciones...
} = require('../controllers/loansController');

// Obtener todos los préstamos
router.get('/loans', getAllLoans);

// Crear nuevo préstamo
router.post('/loans', createLoan);

// Exportar el router
module.exports = router;
