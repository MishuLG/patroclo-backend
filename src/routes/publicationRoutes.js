const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', publicationController.getPublications);
// 'mediaFile' debe coincidir con el nombre del campo en el FormData del frontend
router.post('/', upload.single('mediaFile'), publicationController.createPublication);

module.exports = router;