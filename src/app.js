const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// Importar rutas
const forumRoutes = require('./routes/forumRoutes');
const userRoutes = require('./routes/userRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
app.use(cors()); // Permite peticiones desde tu frontend (React/Vite)
app.use(express.json()); // Parsea JSON en el body
app.use(express.urlencoded({ extended: true })); // Parsea datos de formularios

// --- CARPETA PÚBLICA (IMÁGENES) ---
// Esto permite acceder a http://localhost:3000/uploads/foto.png
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- RUTAS API ---
app.use('/api/forum', forumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/auth', authRoutes);

// --- INICIO DEL SERVIDOR ---
async function main() {
    try {
        // force: false evita borrar los datos cada vez que reinicias
        // alter: true actualiza las tablas si cambias los modelos (útil en desarrollo)
        await sequelize.sync({ force: false, alter: true });
        console.log('✅ Base de datos sincronizada');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar BD:', error);
    }
}

main();