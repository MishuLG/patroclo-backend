const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Rutas del foro
router.get('/', forumController.getPosts);
router.post('/', forumController.createPost);

module.exports = router;