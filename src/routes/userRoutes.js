const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
// Puedes agregar rutas para editar/eliminar aquí

module.exports = router;