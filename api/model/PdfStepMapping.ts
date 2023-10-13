const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfStepMapping = new Schema({
    step: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7', 'general'], 
    },
    pdfs: [{
        name: {
            type: String,
            required: true
        },
        pdfReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pdf',
            required: true
        }
    }]
});


module.exports = mongoose.model('PdfStepMapping', pdfStepMapping);
