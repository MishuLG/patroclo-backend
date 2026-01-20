const { Sequelize } = require('sequelize');
// Cargar variables de entorno explícitamente aquí para asegurar que estén disponibles
require('dotenv').config(); 

// --- BLOQUE DE DEPURACIÓN (Borrar luego de arreglar) ---
console.log("---------------------------------------------------");
console.log("🔍 DIAGNÓSTICO DE VARIABLES DE ENTORNO:");
console.log("DB_NAME:", process.env.DB_NAME ? "✅ Cargado (" + process.env.DB_NAME + ")" : "❌ UNDEFINED");
console.log("DB_USER:", process.env.DB_USER ? "✅ Cargado (" + process.env.DB_USER + ")" : "❌ UNDEFINED");
console.log("DB_PASS:", process.env.DB_PASS ? "✅ Cargado (****)" : "❌ UNDEFINED (CAUSA DEL ERROR)");
console.log("---------------------------------------------------");
// --------------------------------------------------------

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  // Solución temporal: Si es undefined, usa string vacío para evitar el error "must be a string"
  // y permitir que salte el error real de autenticación si la contraseña está mal.
  process.env.DB_PASS || "", 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa.'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

module.exports = sequelize;