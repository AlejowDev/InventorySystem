//toolsController.js
const Tool = require('../models/toolModel');

// Obtener todas las herramientas
const getAllTools = (req, res) => {
  Tool.findAll((err, tools) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(tools);
  });
};

// Crear nueva herramienta
const createTool = (req, res) => {
    const toolData = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.path : null, // Asegúrate de obtener la ruta de la imagen
      serial: req.body.serial, // Asegúrate de que estés enviando el serial
    };
  
    Tool.create(toolData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Herramienta creada exitosamente', tool: result });
    });
  };
  

// Actualizar herramienta
const updateTool = (req, res) => {
  const serial = req.params.serial;
  const toolData = req.body;
  Tool.update(serial, toolData, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Herramienta actualizada exitosamente' });
  });
};

// Eliminar herramienta
const deleteTool = (req, res) => {
  const serial = req.params.serial;
  Tool.delete(serial, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Herramienta eliminada exitosamente' });
  });
};

module.exports = {
  getAllTools,
  createTool,
  updateTool,
  deleteTool,
};
