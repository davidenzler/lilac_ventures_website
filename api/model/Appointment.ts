const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    duration:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema);