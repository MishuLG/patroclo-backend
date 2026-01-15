const db = require('../data/mockDB');

const forumController = {
    getAll: (req, res) => res.json(db.forumPosts),

    create: (req, res) => {
        const post = { id: Date.now(), replies: 0, status: 'abierto', ...req.body };
        db.forumPosts.push(post);
        res.status(201).json(post);
    },

    // --- ACCIÓN ADICIONAL: SIMULAR RESPUESTA ---
    addReply: (req, res) => {
        const { id } = req.params;
        const post = db.forumPosts.find(p => p.id == id);
        if (post) {
            post.replies += 1;
            res.json({ message: 'Nueva respuesta registrada', total_replies: post.replies });
        } else {
            res.status(404).json({ message: 'Tema no encontrado' });
        }
    }
};

module.exports = forumController;