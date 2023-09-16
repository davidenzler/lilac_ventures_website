const Message = require('../model/Message.ts');
const Inbox = require('../model/Inbox.ts');
const User = require('../model/User.ts');

const getMessages = async (req, res) => {
    try {
        const { user, folder } = req.params;

        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const inbox = await Inbox.findOne({ user: foundUser });

        if (!inbox) {
            return res.status(404).json({ error: 'Inbox not found!' });
        }

        let messages = [];
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
        const { sender, receiver, timestamp, subject, content } = req.body;

        const senderUser = await User.findOne({ username: sender }).exec();
        if (!senderUser) return res.sendStatus(401);

        const receiverUser = await User.findOne({ username: receiver }).exec();
        if (!receiverUser) return res.sendStatus(401);

        const message = new Message({ senderUser, receiverUser, timestamp, subject, content });
        await message.save();

        const receiverInbox = await Inbox.findOne({ user: receiverUser });
        receiverInbox.messagesReceived.push(message._id);
        if(!receiverInbox) return res.status(404).json({ error: 'Receiver Inbox not found' });

        const senderInbox = await Inbox.findOne({ user: senderUser });
        senderInbox.messagesSent.push(message._id);
        if (!senderInbox) return res.status(404).json({ error: 'Sender Inbox not found' });

        res.status(201).json({ message: 'Message sent successfully!', data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

const archiveMessage = async (req, res) => {
    try {
        const { user, messageId, folder } = req.params;

        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const inbox = await Inbox.findOne({ user: foundUser });
        if (!inbox) {
            return res.status(404).json({ error: 'Inbox not found!' });
        }

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ error: 'Message not found!' });

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
        const { user, messageId, folder } = req.params;

        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const inbox = await Inbox.findOne({ user: foundUser });
        if (!inbox) {
            return res.status(404).json({ error: 'Inbox not found!' });
        }

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ error: 'Message not found!' });

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