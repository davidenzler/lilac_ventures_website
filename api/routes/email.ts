const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController.ts');

router.post('/', emailController.contactMe);

module.exports = router;