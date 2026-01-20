const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar Usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password, nombre, apellido, cedula, semestre, carrera_id } = req.body;

    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const existingCedula = await User.findOne({ where: { cedula } });
    if (existingCedula) {
      return res.status(400).json({ message: 'La cédula ya está registrada.' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario en la BD
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      nombre,
      apellido,
      cedula,
      semestre,
      carrera_id, // Asegúrate de enviar el ID de la carrera desde el frontend
      rol_id: 2 // Asignamos 'Estudiante' por defecto (según tu DB SQL)
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      userId: newUser.id
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor al registrar usuario.' });
  }
};

// Iniciar Sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Crear Token JWT
    const token = jwt.sign(
      { id: user.id, role: user.rol_id, username: user.username },
      process.env.JWT_SECRET || 'secreto_super_seguro', // Usa variables de entorno en producción
      { expiresIn: '24h' }
    );

    // Responder con datos del usuario (sin el password)
    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol_id: user.rol_id
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor durante el inicio de sesión.' });
  }
};