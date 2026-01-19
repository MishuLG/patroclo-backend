const api = require('../config/apiClient');

const getPosts = async (req, res) => {
  try {
    const { data } = await api.get('/forumPosts');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo foro' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user ? req.user.id : 1;

    const newPost = {
      title,
      content,
      authorId,
      createdAt: new Date()
    };

    const { data } = await api.post('/forumPosts', newPost);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creando post en foro' });
  }
};

module.exports = { getPosts, createPost };