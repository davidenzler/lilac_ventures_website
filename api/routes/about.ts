const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController.ts');
const ROLES_LIST = require('../config/roles_list.ts');
const verifyRoles = require('../middleware/verifyRoles.ts');

// Route to get about data
router.get('/', aboutController.getAboutPageData);

// Route to update about data
router.put('/', verifyRoles(ROLES_LIST.admin), aboutController.updateAboutPageData);

module.exports = router;