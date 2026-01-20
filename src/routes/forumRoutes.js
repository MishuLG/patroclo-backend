const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Importar Middlewares (Asegúrate de que existan, si no, comenta estas líneas)
const verifyToken = require('../middlewares/authMiddleware'); // Necesario para req.user.id
const censorMiddleware = require('../middlewares/censorMiddleware'); // Para filtrar malas palabras

// Ruta para obtener todos los posts
// ANTES: .getMessages -> AHORA: .getForumPosts
router.get('/', forumController.getForumPosts);

// Ruta para crear un post (Protegida con Token + Censura)
// ANTES: .createMessage -> AHORA: .createForumPost
// Si no tienes el verifyToken aún, quitalo, pero el controlador fallará sin req.user
router.post('/', verifyToken, censorMiddleware, forumController.createForumPost);

// Ruta para dar Like
// ANTES: .likeMessage -> AHORA: .likeForumPost
router.put('/:id/like', verifyToken, forumController.likeForumPost);

module.exports = router;