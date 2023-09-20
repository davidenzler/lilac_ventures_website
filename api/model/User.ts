const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fName: {
        type:String,
        required: true
    },
    lName : {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        required: true,
        default: 1
    },
    roles : {
        type: String,
        enum: ['user', 'admin']
    },
    refreshToken: [String]
    
});

module.exports = mongoose.model('User', userSchema);