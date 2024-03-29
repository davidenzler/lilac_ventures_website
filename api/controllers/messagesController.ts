const Message = require('../model/Message.ts');
const Client = require('../model/Client.ts');

const getMessages = async (req, res) => {
    try {
        const { clientEmail, folder } = req.params;

        const foundUser = await Client.findOne({ email: clientEmail }).exec();
        if (!foundUser) {
            console.log(`user with email ${clientEmail} not found.`);
            return res.status(401).json({ error: 'User not found' });
        } 
        
        let messages = [];
        switch (folder) {
            case 'received':
                messages = await Message.find({ receiver: foundUser.email, isDeletedByReceiver: false });
                break;
            case 'sent':
                messages = await Message.find({ sender: foundUser.email, isDeletedBySender: false });
                break;
            case 'archived':
                const receivedArchivedMessages = await Message.find({ receiver: foundUser.email, isArchivedByReceiver: true, isDeletedByReceiver: false });
                const sentArchivedMessages = await Message.find({ sender: foundUser.email, isArchivedBySender: true, isDeletedBySender: false });

                messages = receivedArchivedMessages.concat(sentArchivedMessages);
                break;
            case 'deleted':
                const receivedDeletedMessages = await Message.find({ receiver: foundUser.email, isDeletedByReceiver: true });
                const sentDeletedMessages = await Message.find({ sender: foundUser.email, isDeletedBySender: true });

                messages = receivedDeletedMessages.concat(sentDeletedMessages);
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

        console.log("sender email: " + senderEmail);
        console.log("receiver email: " + receiverEmail);
        console.log("subject: " + subject);
        console.log("content: " + content);


        const senderUser = await Client.findOne({ email: senderEmail }).exec();
        if (!senderUser) {
            console.log(`user with email ${senderEmail} not found.`);
            return res.status(401).json({ error: 'Sender not found' });
        } 

        const receiverUser = await Client.findOne({ email: receiverEmail }).exec();
        if (!receiverUser) {
            console.log(`user with email ${receiverEmail} not found.`);
            return res.status(401).json({ error: 'Receiver not found' });
        } 

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

const flagMessage = async (req, res) => {
    try {
        const { user, messageId, action, flagValue } = req.body;

        console.log("user: " + user);
        console.log("messageId: " + messageId);
        console.log("action: " + action);
        console.log("flagValue: " + flagValue);


        const foundUser = await Client.findOne({ email: user }).exec();
        if (!foundUser) {
            console.log(`user with email ${user} not found.`);
            return res.status(401);
        } 

        const message = await Message.findById(messageId).exec();
        if (!message) return res.status(404).json({ error: 'Message not found!' });
        console.log("message receiver: " + message.receiver);
        console.log("message sender: " + message.sender);

        switch (action) {
            case 'archive':
                {
                    if (message.receiver == user) {
                        console.log("message previously archived by receiver: " + message.isArchivedByReceiver);
                        message.isArchivedByReceiver = flagValue;
                        console.log("message now archived by receiver: " + message.isArchivedByReceiver);
                        message.save();
                        res.status(200).json({ message: 'Message flagged successfully!' });
                    }
                    else if (message.sender == user) {
                        console.log("message previously archived by sender: " + message.isArchivedBySender);
                        message.isArchivedBySender = flagValue;
                        console.log("message now archived by sender: " + message.isArchivedBySender);
                        message.save();
                        res.status(200).json({ message: 'Message flagged successfully!' });
                    }
                    else {
                        return res.status(401).json({ error: 'Neither user associated with this message!' })
                    }
                }
                break;
            case 'delete':
                {
                    if (message.receiver == user) {
                        message.isDeletedByReceiver = flagValue;
                        message.save();

                        res.status(200).json({ message: 'Message deleted successfully!' });
                    }
                    else if (message.sender == user) {
                        message.isDeletedBySender = flagValue;
                        message.save();

                        res.status(200).json({ message: 'Message deleted successfully!' });
                    }
                    else {
                        return res.status(401).json({ error: 'Neither user associated with this message!' })
                    }
                }
                break;
            default:
                return res.status(400).json({ message: 'Invalid action. Action must be archive or delete' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getMessages,
    sendMessage,
    flagMessage
}