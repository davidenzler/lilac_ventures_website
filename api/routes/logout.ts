const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController.ts');

router.get('/', logoutController.handleLogout);

module.exports = router;