const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // 1. Buscar usuario
        const user = await User.findOne({ where: { correo } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // 2. Verificar contraseña (encriptada vs texto plano)
        // Nota: Al crear usuario deberías usar bcrypt.hash()
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // 3. Generar Token
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            'TU_SECRETO_SUPER_SECRETO', // En producción, usa process.env.JWT_SECRET
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: { nombre: user.nombre, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { login };