const Message = require('../models/Message');
const Inbox = require('../models/Inbox');

const getMessages = async (req, res) => {
    try {
        const { userId, folder } = req.params;
        let messages = [];

        const inbox = await Inbox.findOne({ user: userId });

        if (!inbox) {
            return res.status(404).json({ error: 'Inbox not found!' });
        }

        switch (folder) {
            case 'received':
                messages = await Message.find({ _id: { $in: inbox.messagesReceived } });
                break;
            case 'sent':
                messages = await Message.find({ _id: { $in: inbox.messagesSent } });
                break;
            case 'archived':
                messages = await Message.find({ _id: { $in: inbox.messagesArchived } });
                break;
            case 'deleted':
                messages = await Message.find({ _id: { $in: inbox.messagesDeleted } });
                break;
            default:
                return res.status(400).json({ message: 'Specified folder not found!' });
        }

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { receiver, timestamp, subject, content } = req.body;
        const sender = req.user._id;

        const message = new Message({ sender, receiver, timestamp, subject, content });
        await message.save();

        const receiverInbox = await Inbox.findOne({ user: receiver });
        receiverInbox.messagesReceived.push(message._id);

        const senderInbox = await Inbox.findOne({ user: sender });
        senderInbox.messagesSent.push(message._id);

        res.status(201).json({ message: 'Message sent successfully!', data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

const archiveMessage = async (req, res) => {
    try {
        const { user, message, folder } = req.params;

        const inbox = await Inbox.findOne({ user: user });
        if (!inbox) {
            return res.status(404).json({ error: 'Inbox not found!' });
        }

        let currentFolder;
        switch (folder) {
            case 'received':
                currentFolder = inbox.messagesReceived;
                break;
            case 'sent':
                currentFolder = inbox.messagesSent;
                break;
            case 'archived':
                currentFolder = inbox.messagesArchived;
                break;
            case 'deleted':
                currentFolder = inbox.messagesDeleted;
                break;
            default:
                return res.status(400).json({ message: 'Specified folder not found!' });
        }

        const messageIndex = currentFolder.indexOf(message);
        if (messageIndex !== -1) {
            currentFolder.splice(messageIndex, 1);
            inbox.messagesArchived.push(message);

            await inbox.save();
            res.status(200).json({ message: 'Message archived successfully!' });
        }
        else {
            res.status(404).json({ message: 'Message not found!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { user, message, folder } = req.params;

        const inbox = await Inbox.findOne({ user: user });
        if (!inbox) {
            return res.status(404).json({ error: 'Inbox not found!' });
        }

        let currentFolder;
        switch (folder) {
            case 'received':
                currentFolder = inbox.messagesReceived;
                break;
            case 'sent':
                currentFolder = inbox.messagesSent;
                break;
            case 'archived':
                currentFolder = inbox.messagesArchived;
                break;
            case 'deleted':
                currentFolder = inbox.messagesDeleted;
                break;
            default:
                return res.status(400).json({ message: 'Specified folder not found!' });
        }

        const messageIndex = currentFolder.indexOf(message);
        if (messageIndex !== -1) {
            currentFolder.splice(messageIndex, 1);
            inbox.messagesDeleted.push(message);

            await inbox.save();
            res.status(200).json({ message: 'Message deleted successfully!' });
        }
        else {
            res.status(404).json({ message: 'Message not found!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getMessages,
    sendMessage,
    archiveMessage,
    deleteMessage
}