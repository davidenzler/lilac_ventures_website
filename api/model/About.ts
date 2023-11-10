const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    aboutUs: String,
    ourMission: String,
    ourValues: String,
    meet: String
});

module.exports = mongoose.model('About', aboutSchema);