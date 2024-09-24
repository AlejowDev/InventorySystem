//toolsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllTools,
  createTool,
  updateTool,
  deleteTool,
} = require('../controllers/toolsController');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Cambia a la carpeta donde quieras almacenar las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Guarda la imagen con un nombre único
  },
});

// Obtener todas las herramientas
router.get('/tools', getAllTools);

// Crear nueva herramienta
router.post('/tools', multer({ storage }).single('imagen'), createTool);

// Actualizar herramienta
router.put('/tools/:serial', updateTool);

// Eliminar herramienta
router.delete('/tools/:serial', deleteTool);

module.exports = router;
