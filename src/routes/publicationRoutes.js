const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const upload = require('../middlewares/uploadMiddleware'); // Tu configuración de Multer
const verifyToken = require('../middlewares/authMiddleware');

// Obtener publicaciones
router.get('/', publicationController.getPublications);

// Crear publicación (Requiere subida de imagen + auth)
router.post('/', verifyToken, upload.single('file'), publicationController.createPublication);

// Borrar publicación
router.delete('/:id', verifyToken, publicationController.deletePublication);

module.exports = router;