const api = require('../config/apiClient');

const getPublications = async (req, res) => {
  try {
    const { data } = await api.get('/publications');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo publicaciones' });
  }
};

const createPublication = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user ? req.user.id : 1; 

    const newPub = {
      title,
      content,
      authorId,
      createdAt: new Date()
    };

    const { data } = await api.post('/publications', newPub);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creando publicación' });
  }
};

const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    await api.delete(`/publications/${id}`);
    res.json({ message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando publicación' });
  }
};

module.exports = { getPublications, createPublication, deletePublication };