const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availibilitySchema = new mongoose.Schema({
    date: {
        type: String,
        required:true
    },
    time:{
        type: [String],
        required:true
    }
})

module.exports = mongoose.model('Appointment', availibilitySchema);