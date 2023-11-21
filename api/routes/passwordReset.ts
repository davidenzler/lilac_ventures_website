const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController.ts');

router.post('/', passwordResetController.passwordReset);

module.exports = router;