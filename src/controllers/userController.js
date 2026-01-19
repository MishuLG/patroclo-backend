const api = require('../config/apiClient');

const getAllUsers = async (req, res) => {
  try {
    const { data } = await api.get('/users');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await api.get(`/users/${id}`);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await api.patch(`/users/${id}`, req.body);
    res.json({ message: 'Usuario actualizado', user: data });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await api.delete(`/users/${id}`);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};