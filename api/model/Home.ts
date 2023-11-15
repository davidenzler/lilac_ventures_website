const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    hero: String,
    info: String
});

module.exports = mongoose.model('Home', homeSchema);