const PdfStepMapping = require('../model/PdfStepMapping.ts');
const filesController = require("./filesController.ts");
const axios = require('axios');
const { gfs, gridfsBucket} = require('../middleware/gridFsSetup.ts'); 

const createMapping = async (req, res) => {
    try {
        // 1. Remove all existing records
        await PdfStepMapping.deleteMany({});

        // 2. Create a new table for steps 1-7 with empty PDFs array
        const steps = ['general', '1', '2', '3', '4', '5', '6', '7' ];
        const mappings = steps.map(step => ({ step, pdfs: [] }));

        const results = await PdfStepMapping.insertMany(mappings);

        // 3. Return the newly created records
        res.status(201).json(results);
    } catch (error) {
        console.error("Error creating mappings:", error);
        res.status(500).json({ "message": "Internal Server Error." });
    }
};

const updateMappingWithPdf = async (req, res) => {
    try {
        // Using stepNumber as a string
        const stepNumber = req.params.stepNumber;

        // Upload the PDF using the utility function
        const newPdf = await filesController.uploadPdfForMapping(req);

        // Add the uploaded PDF reference to the specified step
        const stepMapping = await PdfStepMapping.findOne({ step: stepNumber });
        if (!stepMapping) {
            throw new Error("Specified step number not found.");
        }

        stepMapping.pdfs.push({
            name: newPdf.name,
            pdfReference: newPdf._id
        });

        await stepMapping.save();

        res.status(200).json({ success: true, message: "PDF added to step mapping.", pdf: newPdf });

    } catch (error) {
        console.error("Error updating mapping with PDF:", error);
        res.status(500).json({ "message": "Internal Server Error." });
    }
};

const deletePdfFromMapping = async (req, res) => {
    try {
        // Using stepNumber as a string
        const stepNumber = req.params.stepNumber;
        const fileName = req.params.fileName;

        // Find the step mapping
        const stepMapping = await PdfStepMapping.findOne({ step: stepNumber });
        if (!stepMapping) {
            throw new Error("Specified step number not found.");
        }

        // Check if the file name exists in the step mapping
        const pdfEntry = stepMapping.pdfs.find(pdf => pdf.name === fileName);
        if (!pdfEntry) {
            throw new Error("PDF with specified file name not found in step mapping.");
        }

        // Making a DELETE request to your files route
        await filesController.deleteSpecificFile(gfs(), gridfsBucket(), req, res);

        // Remove the PDF reference from the step mapping
        stepMapping.pdfs.pull(pdfEntry);
        await stepMapping.save();

    } catch (error) {
        console.error("Error deleting PDF from mapping:", error);
        res.status(500).json({ "message": "Internal Server Error." });
    }
};

module.exports = {
    createMapping,
    updateMappingWithPdf,
    deletePdfFromMapping
};
