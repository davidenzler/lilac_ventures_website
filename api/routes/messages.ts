const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyJWT.ts')

const messagesController = require('../controllers/messagesController.ts');

// get all messages from a given folder
router.get('/:clientEmail/:folder', messagesController.getMessages);

// send message
router.post('/', messagesController.sendMessage);

// archive message
router.post('/archive/:messageId', messagesController.archiveMessage);

// delete message
router.post('/delete/:messageId', messagesController.deleteMessage);

module.exports = router;