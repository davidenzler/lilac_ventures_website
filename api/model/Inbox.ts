const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inboxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messagesReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    messagesSent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    messagesArchived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    messagesDeleted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
})

module.exports = mongoose.model('Inbox', inboxSchema);