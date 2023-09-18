const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.ts');

router.post('/',appointmentController.addAppointment)

router.get('/user/:user',appointmentController.getAppointments)

router.get('/',appointmentController.getAllAppointments)

router.post('/edit/:date/:time',appointmentController.editAppointment)

router.post('/del/:date/:time',appointmentController.delAppointment)

module.exports = router;