const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController.ts');
const verifyJWT = require('../middleware/verifyJWT.ts');


router.post('/', emailController.contactMe);
router.post('/greeting', verifyJWT, emailController.greetingEmail);


module.exports = router;