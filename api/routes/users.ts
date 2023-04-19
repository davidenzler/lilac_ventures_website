const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.ts');

router.post('/', userController.createNewUser);

module.exports = router;