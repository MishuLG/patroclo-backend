const db = require('../data/mockDB');

const userController = {
    getAll: (req, res) => res.json(db.users),

    create: (req, res) => {
        const newUser = { id: db.users.length + 1, ...req.body };
        db.users.push(newUser);
        res.status(201).json({ message: 'Usuario registrado', user: newUser });
    },

    update: (req, res) => {
        const { id } = req.params;
        const index = db.users.findIndex(u => u.id == id);
        
        if (index !== -1) {
            db.users[index] = { ...db.users[index], ...req.body };
            res.json({ message: 'Usuario actualizado', user: db.users[index] });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    },

    delete: (req, res) => {
        const { id } = req.params;
        const initialLength = db.users.length;
        db.users = db.users.filter(u => u.id != id);
        
        if (db.users.length < initialLength) res.json({ message: 'Usuario eliminado' });
        else res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

module.exports = userController;