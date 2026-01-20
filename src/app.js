const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar la conexión a la base de datos
const sequelize = require('./config/database');

// Inicializar la app
const app = express();
const PORT = process.env.PORT || 4000; // Puerto 4000 solicitado

// Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (para las imágenes/PDFs subidos)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Importar Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/publications', require('./routes/publicationRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Patroclo funcionando con PostgreSQL 🚀');
});

// Sincronizar Base de Datos y Arrancar Servidor
// "alter: true" actualiza las tablas si cambias algo en los modelos, sin borrar datos.
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos PostgreSQL sincronizada.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
  });

module.exports = app;