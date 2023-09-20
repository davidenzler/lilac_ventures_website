const Message = require('../model/Message.ts');
const User = require('../model/User.ts');

const getMessages = async (req, res) => {
    try {
        const { user, folder } = req.body;

        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);
        console.log(foundUser.username);
        let messages = [];
        switch (folder) {
            case 'received':
                messages = await Message.find({ receiver: foundUser.username, isArchived: false, isDeleted: false });
                break;
            case 'sent':
                messages = await Message.find({ sender: foundUser.username, isArchived: false, isDeleted: false });
                break;
            case 'archived':
                messages = await Message.find({ receiver: foundUser.username, isArchived: true, isDeleted: false });
                break;
            case 'deleted':
                messages = await Message.find({ receiver: foundUser.username, isArchived: false, isDeleted: true });
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
        const { sender, receiver, subject, content } = req.body;

        const senderUser = await User.findOne({ username: sender }).exec();
        if (!senderUser) return res.sendStatus(401).json({error: 'Sender not found'});

        const receiverUser = await User.findOne({ username: receiver }).exec();
        if (!receiverUser) return res.sendStatus(401).json({error: 'Receiver not found'});

        const senderName = senderUser.username;
        const receiverName = receiverUser.username;

        const message = new Message({
            sender: senderName,
            receiver: receiverName,
            subject: subject,
            content: content
        });
        await message.save();

        res.status(201).json({ message: 'Message sent successfully!', data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

const archiveMessage = async (req, res) => {
    try {
        const { user, messageId } = req.params;

        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const message = await Message.findById(messageId).exec();
        if (!message) return res.status(404).json({ error: 'Message not found!' });

        message.isArchived = true;
        res.status(200).json({ message: 'Message archived successfully!' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { user, messageId } = req.params;

        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ error: 'Message not found!' });

        message.isDeleted = true;
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