const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ForumPost = sequelize.define('ForumPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  autor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'usuarios',
        key: 'id'
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'foro_posts',
  timestamps: false
});

// 1. Relación simple (no circular)
ForumPost.belongsTo(User, { foreignKey: 'autor_id', as: 'autor' });

// 2. EXPORTAR EL MODELO AHORA (Rompe el ciclo)
module.exports = ForumPost;

// 3. Requerir la dependencia circular DESPUÉS de exportar
const Comment = require('./comment'); 

// 4. Definir la relación circular
ForumPost.hasMany(Comment, { foreignKey: 'foro_post_id', as: 'comentarios' });