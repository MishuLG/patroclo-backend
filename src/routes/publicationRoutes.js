const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');

router.get('/', publicationController.getAll);
router.post('/', publicationController.create);
router.delete('/:id', publicationController.delete);
// Ruta especial extra
router.post('/:id/like', publicationController.likePost);

module.exports = router;