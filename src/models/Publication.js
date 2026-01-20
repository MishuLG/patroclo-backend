const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Publication = sequelize.define('Publication', {
  // ... (tu configuración actual de columnas) ...
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.TEXT
  },
  media_url: {
      type: DataTypes.TEXT
  },
  media_type: {
      type: DataTypes.STRING(50)
  },
  autor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'publicaciones',
  timestamps: false
});

// Relación
Publication.belongsTo(User, { foreignKey: 'autor_id', as: 'autor' });

// Definimos la inversa aquí sin requerir User de nuevo (User ya se cargó arriba)
User.hasMany(Publication, { foreignKey: 'autor_id' });

module.exports = Publication;