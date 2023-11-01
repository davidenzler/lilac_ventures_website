const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewPDFUploads = new Schema({
    pdf_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true 
    },
    pdf_name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    step_number: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('NewPDFUploads', NewPDFUploads);
