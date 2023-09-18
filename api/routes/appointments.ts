const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.ts');

router.post('/',appointmentController.addAppointment)

router.get('/user/:user',appointmentController.getAppointments)

router.get('/',appointmentController.getAllAppointments)

router.patch('/edit/:date/:time',appointmentController.editAppointment)

router.delete('/del/:date/:time',appointmentController.delAppointment)

module.exports = router;