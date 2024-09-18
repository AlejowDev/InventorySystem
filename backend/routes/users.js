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

// Eliminar un usuario por Documento
router.delete('/users/:document', (req, res) => {
    const userDocument = req.params.document;

    User.delete(userDocument, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error al eliminar el usuario' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    });
});

// Actualizar usuario por Documento
router.put('/users/:document', (req, res) => {
  const userDocument = req.params.document;
  const userData = req.body;

  User.update(userDocument, userData, (error, result) => {
      if (error) {
          return res.status(500).json({ message: 'Error al actualizar el usuario' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
  });
});

module.exports = router;
