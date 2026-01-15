const db = require('../data/mockDB');

const commentController = {
    getAll: (req, res) => res.json(db.comments),

    create: (req, res) => {
        const comment = { id: Date.now(), approved: false, ...req.body };
        db.comments.push(comment);
        res.status(201).json(comment);
    },

    // --- ACCIÓN ADICIONAL: APROBAR COMENTARIO ---
    approve: (req, res) => {
        const { id } = req.params;
        const comment = db.comments.find(c => c.id == id);
        if (comment) {
            comment.approved = true;
            res.json({ message: 'Comentario aprobado por admin', comment });
        } else {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
    }
};

module.exports = commentController;