const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


if (!userController.getAllUsers) {
    console.error("Error: userController.getAllUsers es undefined. Revisa src/controllers/userController.js");
}

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;