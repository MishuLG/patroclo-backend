const api = require('../config/apiClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

const register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const { data: users } = await api.get(`/users?username=${username}`);
    if (users.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      email,
      role: role || 'user',
      createdAt: new Date()
    };

    const { data: createdUser } = await api.post('/users', newUser);
    res.status(201).json({ message: 'Usuario registrado', user: createdUser });

  } catch (error) {
    res.status(500).json({ message: 'Error en registro', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { data: users } = await api.get(`/users?username=${username}`);
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token, user });

  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};

module.exports = { register, login };