const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availibilitySchema = new mongoose.Schema({
    date: {
        type: String,
        required:true
    },
    time:{
        type: [Number],
        required:true
    }
})

module.exports = mongoose.model('Availability', availibilitySchema);