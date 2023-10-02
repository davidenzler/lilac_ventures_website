const express = require('express');
const router = express.Router();

const aboutInfoController = require('../controllers/aboutInfoController.ts');

// get About page details
router.get('/', aboutInfoController.getAboutPageDetails);

// Update About page details
router.post('/updateAboutPage/:id', aboutInfoController.updateAboutPage);

// Delete About page details
router.get('/deleteAboutPageDetails/:id', aboutInfoController.deleteAboutPageDetails);

module.exports = router;