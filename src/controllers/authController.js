const db = require('../data/mockDB');

const authController = {
    // REQUISITO: Login
    login: (req, res) => {
        const { username, password } = req.body;
        const user = db.users.find(u => u.username === username && u.password === password);

        if (user) {
            // Simulamos token
            const { password, ...userWithoutPass } = user;
            return res.json({
                message: 'Login exitoso',
                token: `fake-jwt-token-${user.id}`,
                user: userWithoutPass
            });
        }
        return res.status(401).json({ message: 'Credenciales inválidas' });
    },

    // REQUISITO: Perfil de usuario con información
    getProfile: (req, res) => {
        const { id } = req.params;
        const user = db.users.find(u => u.id == id);

        if (user) {
            const { password, ...userWithoutPass } = user;
            return res.json(userWithoutPass);
        }
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

module.exports = authController;