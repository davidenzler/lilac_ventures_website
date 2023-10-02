const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyJWT.ts')

const messagesController = require('../controllers/messagesController.ts');

// get all messages from a given folder
router.get('/', messagesController.getMessages);

// send message
router.post('/', messagesController.sendMessage);

// archive message
router.post('/:messageId', messagesController.archiveMessage);

// delete message
router.post('/:messageId', messagesController.deleteMessage);

module.exports = router;