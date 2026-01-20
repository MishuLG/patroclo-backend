const User = require('../models/User');

// Obtener todos los usuarios (para admin o listas)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'nombre', 'apellido', 'carrera_id', 'semestre'] // Excluir password
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Solo permitir que el usuario se edite a sí mismo (a menos que sea admin)
    if (parseInt(id) !== req.user.id && req.user.role !== 1) {
        return res.status(403).json({ message: 'No tienes permiso para editar este usuario' });
    }

    const { nombre, apellido, telefono } = req.body;
    
    await User.update(
      { nombre, apellido, telefono },
      { where: { id } }
    );

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};