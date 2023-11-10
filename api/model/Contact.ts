const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    callTo: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Contact', contactSchema);