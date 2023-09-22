const Message = require('../model/Message.ts');
const Client = require('../model/Client.ts');

const getMessages = async (req, res) => {
    try {
        const { clientEmail, folder } = req.body;

        const foundUser = await Client.findOne({ email: clientEmail }).exec();
        if (!foundUser) return res.sendStatus(401);

        let messages = [];
        switch (folder) {
            case 'received':
                messages = await Message.find({ receiver: foundUser.email, isArchived: false, isDeleted: false });
                break;
            case 'sent':
                messages = await Message.find({ sender: foundUser.email, isArchived: false, isDeleted: false });
                break;
            case 'archived':
                messages = await Message.find({ receiver: foundUser.email, isArchived: true, isDeleted: false });
                break;
            case 'deleted':
                messages = await Message.find({ receiver: foundUser.email, isArchived: false, isDeleted: true });
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
        const { senderEmail, receiverEmail, subject, content } = req.body;

        const senderUser = await Client.findOne({ email: senderEmail }).exec();
        if (!senderUser) return res.sendStatus(401).json({error: 'Sender not found'});

        const receiverUser = await Client.findOne({ email: receiverEmail }).exec();
        if (!receiverUser) return res.sendStatus(401).json({error: 'Receiver not found'});

        const sender = senderUser.email;
        const receiver = receiverUser.email;

        const message = new Message({
            sender: sender,
            receiver: receiver,
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

        const foundUser = await Client.findOne({ email: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const message = await Message.findById(messageId).exec();
        if (!message) return res.status(404).json({ error: 'Message not found!' });

        if (message.receiver == user) {
            message.isArchivedByReceiver = true;
            res.status(200).json({ message: 'Message archived successfully!' });
        }
        else if (message.sender == user) {
            message.isArchivedBySender = true;
            res.status(200).json({ message: 'Message archived successfully!' });
        }
        else {
            return res.status(401).json({error: 'Neither user associated with this message!'})
        }
        

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { user, messageId } = req.params;

        const foundUser = await Client.findOne({ email: user }).exec();
        if (!foundUser) return res.sendStatus(401);

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ error: 'Message not found!' });

        if (message.receiver == user) {
            message.isDeletedByReceiver = true;
            res.status(200).json({ message: 'Message deleted successfully!' });
        }
        else if (message.sender == user) {
            message.isDeletedBySender = true;
            res.status(200).json({ message: 'Message deleted successfully!' });
        }
        else {
            return res.status(401).json({ error: 'Neither user associated with this message!' })
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