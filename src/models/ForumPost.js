// src/models/ForumPost.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ForumPost = sequelize.define('ForumPost', {
    author: {
        type: DataTypes.STRING, // Podrías relacionarlo con User.id más adelante
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = ForumPost;