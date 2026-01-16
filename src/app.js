const express = require('express');
const cors = require('cors');

// Importar Rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const forumRoutes = require('./routes/forumRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Definir Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`💾 Modo: Base de datos en Memoria (Arrays)`);
});

module.exports = app;