const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAll);
router.post('/', commentController.create);
// Ruta especial extra
router.put('/:id/approve', commentController.approve);

module.exports = router;