const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    subject: { type: String },
    content: { type: String },
    isArchivedBySender: {
        type: Boolean,
        default: false
    },
    isArchivedByReceiver: {
        type: Boolean,
        default: false
    },
    isReadBySender: {
        type: Boolean,
        default: false
    },
    isReadByReceiver: {
        type: Boolean,
        default: false
    },
    isDeletedBySender: {
        type: Boolean,
        default: false
    },
    isDeletedByReceiver: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema);