const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100)
  },
  apellido: {
    type: DataTypes.STRING(100)
  },
  cedula: {
    type: DataTypes.STRING(20),
    unique: true
  },
  semestre: {
    type: DataTypes.INTEGER
  },
  rol_id: {
    type: DataTypes.INTEGER,
    defaultValue: 2 // Asumiendo que 2 es 'estudiante'
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios', // IMPORTANTE: Nombre exacto de la tabla en PG
  timestamps: false
});

module.exports = User;