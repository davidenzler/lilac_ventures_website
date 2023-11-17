const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.ts');
const ROLES_LIST = require('../config/roles_list.ts');
const verifyRoles = require('../middleware/verifyRoles.ts');

// Route to get homepage data
router.get('/', homeController.getHomePageData);

// Route to update homepage data
router.put('/', homeController.updateHomePageData);

module.exports = router;

