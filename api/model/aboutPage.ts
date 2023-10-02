const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Schema for About page
let aboutSchema = new Schema({
    openingPitch: {
        type: String
    },
    aboutUs: {
        type: String
    },
    ourMission: {
        type: String
    },
    ourValues: {
        type: String
    },
    meetGail: {
        type: String
    }, 
    image: {
        data: 'Buffer',
        contentType: String
    }
})

module.exports = mongoose.model("About", aboutSchema);