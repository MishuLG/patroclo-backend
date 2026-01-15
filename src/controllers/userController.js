// src/controllers/userController.js
const User = require('../models/User');
const { Op } = require('sequelize');

const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

const createUser = async (req, res) => {
    try {
        // Validaciones manuales de unicidad (aunque el modelo ya tiene unique: true)
        const { cedula, correo, telefono } = req.body;
        
        const exists = await User.findOne({
            where: {
                [Op.or]: [{ cedula }, { correo }, { telefono }]
            }
        });

        if (exists) {
            return res.status(400).json({ error: 'Cédula, correo o teléfono ya registrados.' });
        }

        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ... Agregar update y delete siguiendo la misma lógica
module.exports = { getUsers, createUser };