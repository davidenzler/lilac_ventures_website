const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Client Schema
let adminSchema = new Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String

    }
})
module.exports = mongoose.model("Admin", adminSchema);