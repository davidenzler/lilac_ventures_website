const express = require("express");
const router = express.Router();
const pdfStepMappingController = require("../controllers/pdfStepMappingController.ts");
const { upload } = require('../middleware/gridFsSetup.ts'); 

//Initializes the tables
router.route('/')
  .post(pdfStepMappingController.createMapping);

// Add a pdf to a step
router.route('/:stepNumber')
  .put(upload.single('file'), pdfStepMappingController.updateMappingWithPdf);

// Delete a pdf given the step and filename 
router.route('/:stepNumber/:fileName')
  .delete(pdfStepMappingController.deletePdfFromMapping);

module.exports = router;
