const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/', verifyToken, userController.getAllUsers);
router.get('/profile', verifyToken, userController.getProfile);
router.put('/:id', verifyToken, userController.updateUser);

module.exports = router;