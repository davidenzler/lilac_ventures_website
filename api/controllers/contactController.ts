const Contact = require('../model/Contact.ts');

// Get data
const getContactPageData = async (req, res) => {
    try {
        const contactData = await Contact.find();
        res.json(contactData);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
};

// Update data
const updateContactPageData = async (req, res) => {
    try {
        const contact = await Contact.findOne(); // Retrive data

        if (!contact) {
            // Create if it does not exist
            const newContact = new Contact({
                callTo: req.body.callTo,
                email: req.body.email,
                phone: req.body.phone
            });
            await newContact.save();
            return res.json({ message: 'New Contact entry created'});
        }

        // Update fields
        contact.callTo = req.body.callTo;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        await contact.save();

        res.json({ message: 'Contact details updated successfully'});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getContactPageData,
    updateContactPageData
}