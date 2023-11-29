const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController.ts');

router.post('/',availabilityController.addAvailability)

router.get('/date/:date',availabilityController.getAvailability)

router.get('/',availabilityController.getAllAvailabilities)

router.post('/date/:date',availabilityController.editAvailability)


module.exports = router;