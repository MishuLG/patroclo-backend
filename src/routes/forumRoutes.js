const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const censorMiddleware = require('../middlewares/censorMiddleware');

router.get('/', forumController.getMessages);
// Aplicamos el censorMiddleware ANTES del controlador
router.post('/', censorMiddleware, forumController.createMessage);
router.put('/:id/like', forumController.likeMessage);
router.delete('/:id', forumController.deleteMessage);

module.exports = router;