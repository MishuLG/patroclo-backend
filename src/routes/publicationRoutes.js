const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');

// Rutas de publicaciones
router.get('/', publicationController.getPublications);
router.post('/', publicationController.createPublication);
router.delete('/:id', publicationController.deletePublication);

module.exports = router;