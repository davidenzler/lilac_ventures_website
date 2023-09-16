const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyJWT.ts')

const inboxController = require('../controllers/inboxController.ts');

// get all messages from a given folder
router.get('/:userId/:folder', inboxController.getMessages);

// send message
router.post('/', inboxController.sendMessage);

// archive message
router.post('/:userId/:folder/:messageId', inboxController.archiveMessage);

// delete message
router.post('/:userId/:folder/:messageId', inboxController.deleteMessage);

module.exports = router;