const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.ts');

router.post('/', registerController.handleNewUser);

module.exports = router;