// src/controllers/publicationController.js
const Publication = require('../models/Publication');

const createPublication = async (req, res) => {
    try {
        const { title, body } = req.body;
        // Si se subió un archivo, multer lo pone en req.file
        const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const mediaType = req.file ? req.file.mimetype : null;

        const newPost = await Publication.create({
            title,
            body,
            mediaUrl,
            mediaType
        });
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPublications = async (req, res) => {
    const posts = await Publication.findAll({ order: [['date', 'DESC']] });
    res.json(posts);
};

module.exports = { createPublication, getPublications };