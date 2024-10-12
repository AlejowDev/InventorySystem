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
        imagen: req.file ? req.file.path : null,
        serial: req.body.serial,
    };

    Tool.create(toolData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Herramienta creada exitosamente', tool: result });
    });
};


const updateTool = (req, res) => {
  const serial = req.params.serial;
  
  // Primero, buscamos la herramienta existente para obtener la imagen actual
  Tool.findById(serial, (err, existingTool) => {
      if (err || !existingTool) {
          return res.status(404).json({ error: 'Herramienta no encontrada' });
      }

      // Mantenemos la imagen existente si no se proporciona una nueva
      const toolData = {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          imagen: req.file ? req.file.path : existingTool.imagen, // Si no hay nueva imagen, usa la existente
      };

      Tool.update(serial, toolData, (err) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Herramienta actualizada exitosamente' });
      });
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
