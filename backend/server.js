//server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const usersRouter = require('./routes/users');
const adminRoutes = require('./routes/adminRoutes');
const toolsRoutes = require('./routes/toolsRoutes'); // Importar las rutas de herramientas

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/auth', authRoutes);
app.use('/api', usersRouter);
app.use('/api/admin', adminRoutes);
app.use('/api', toolsRoutes); // Usar las rutas de herramientas

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
