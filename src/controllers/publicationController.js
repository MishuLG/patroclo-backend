const db = require('../data/mockDB');

const publicationController = {
    getAll: (req, res) => res.json(db.publications),

    create: (req, res) => {
        const post = { id: Date.now(), likes: 0, ...req.body };
        db.publications.push(post);
        res.status(201).json(post);
    },

    delete: (req, res) => {
        const { id } = req.params;
        db.publications = db.publications.filter(p => p.id != id);
        res.json({ message: 'Publicación eliminada' });
    },

    // --- ACCIÓN ADICIONAL: DAR LIKE ---
    likePost: (req, res) => {
        const { id } = req.params;
        const post = db.publications.find(p => p.id == id);
        if (post) {
            post.likes += 1;
            res.json({ message: 'Like agregado', likes: post.likes });
        } else {
            res.status(404).json({ message: 'Publicación no encontrada' });
        }
    }
};

module.exports = publicationController;