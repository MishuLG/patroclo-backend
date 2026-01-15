// src/controllers/forumController.js
const ForumPost = require('../models/ForumPost');

// Obtener todos los mensajes
const getMessages = async (req, res) => {
    try {
        const messages = await ForumPost.findAll({ order: [['timestamp', 'ASC']] });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};

// Crear mensaje (ya viene censurado por el middleware)
const createMessage = async (req, res) => {
    try {
        const { author, content } = req.body;
        const newMessage = await ForumPost.create({ author, content });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Dar Like
const likeMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await ForumPost.findByPk(id);
        if (!post) return res.status(404).json({ error: 'Mensaje no encontrado' });

        post.likes += 1;
        await post.save();
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await ForumPost.destroy({ where: { id } });
        res.json({ message: 'Mensaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMessages, createMessage, likeMessage, deleteMessage };