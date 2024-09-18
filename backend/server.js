// index.js (o el archivo principal de rutas)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const usersRouter = require('./routes/users');
const adminRoutes = require('./routes/adminRoutes'); // Nueva ruta para admin

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', usersRouter);
app.use('/api/admin', adminRoutes); // Nueva ruta para admin

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
