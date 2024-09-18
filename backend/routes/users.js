const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Obtener todos los usuarios
router.get('/users', (req, res) => {
    User.findAll((error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener usuarios' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
