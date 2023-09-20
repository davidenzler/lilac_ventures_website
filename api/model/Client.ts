const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Client Schema
let clientSchema = new Schema({
    firstname:{
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String

    },

    phone: {
        type: Number
    },

    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },

    progress: {
        type: Number,
        required: true,
        default: 1
    },
    
    contactPreference:{
        type: String
    },
  
})
    module.exports = mongoose.model("Client", clientSchema);