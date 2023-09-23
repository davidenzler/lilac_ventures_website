const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    fileId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    seenByAdmin: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('Pdf', pdfSchema);
