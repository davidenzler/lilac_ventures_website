const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.ts');
const verifyRoles = require('../middleware/verifyJWT.ts')

router.post('/',appointmentController.addAppointment)

router.get('/:user',appointmentController.getAllAppointments)

router.get('/',appointmentController.getAllAppointments)

router.post('/:date/:time',appointmentController.editAppointment)

router.post('/:date/:time',appointmentController.delAppointment)

module.exports = router;