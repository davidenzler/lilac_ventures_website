const express = require('express');
const router = express.Router();
const firstTimeLogin = require('../controllers/firstTimeLogin');

router.post('/check-first-login', firstTimeLogin.checkFirstLogin);

module.exports = router;