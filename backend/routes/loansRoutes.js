const express = require('express');
const router = express.Router();
const {
    getAllLoans,
    createLoan,
    deleteLoan,
    updateLoan // Importar la nueva función de actualización
} = require('../controllers/loansController');

// Obtener todos los préstamos
router.get('/loans', getAllLoans);

// Crear nuevo préstamo
router.post('/loans', createLoan);

// Eliminar un préstamo por ID
router.delete('/loans/:id', deleteLoan); // Ruta para eliminar un préstamo

// Actualizar un préstamo por ID
router.put('/loans/:id', updateLoan); // Ruta para actualizar un préstamo

// Exportar el router
module.exports = router;
