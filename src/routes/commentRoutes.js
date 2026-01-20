const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/authMiddleware');

// Ruta para obtener comentarios de un post (Ej: GET /api/comments/post/1)
router.get('/post/:postId', commentController.getComments);

// Ruta para crear comentario (Ej: POST /api/comments)
router.post('/', verifyToken, commentController.createComment);

module.exports = router;