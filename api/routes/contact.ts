const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController.ts');
const ROLES_LIST = require('../config/roles_list.ts');
const verifyRoles = require('../middleware/verifyRoles.ts');

// Route to get contact data
router.get('/', contactController.getContactPageData);

// Route to update contact data
router.put('/', contactController.updateContactPageData);

module.exports = router;