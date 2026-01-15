const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getAll);
router.post('/', forumController.create);
// Ruta especial extra
router.put('/:id/reply', forumController.addReply);

module.exports = router;