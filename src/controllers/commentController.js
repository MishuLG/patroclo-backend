const api = require('../config/apiClient');

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { data } = await api.get(`/comments?postId=${postId}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo comentarios' });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user ? req.user.id : 1;

    const newComment = {
      content,
      postId: parseInt(postId), 
      authorId,
      createdAt: new Date()
    };

    const { data } = await api.post('/comments', newComment);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error agregando comentario' });
  }
};

module.exports = { getCommentsByPost, addComment };