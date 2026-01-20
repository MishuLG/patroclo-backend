const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Comment = sequelize.define('Comment', {
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
  foro_post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'foro_posts',
      key: 'id'
    }
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'comentarios',
  timestamps: false
});

// 1. Relación simple
Comment.belongsTo(User, { foreignKey: 'autor_id', as: 'autor' });

// 2. EXPORTAR EL MODELO AHORA
module.exports = Comment;

// 3. Requerir la dependencia circular DESPUÉS
const ForumPost = require('./ForumPost');

// 4. Definir relación circular
Comment.belongsTo(ForumPost, { foreignKey: 'foro_post_id', as: 'post' });