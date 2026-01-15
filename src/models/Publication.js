// src/models/Publication.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publication = sequelize.define('Publication', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mediaUrl: {
        type: DataTypes.STRING, // Guardará la ruta del archivo
        allowNull: true
    },
    mediaType: {
        type: DataTypes.STRING, // Ej: 'image/png', 'application/pdf'
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Publication;