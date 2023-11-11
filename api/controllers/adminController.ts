const Admin = require('../model/Admin.ts');

//Get List of Clients
const getAdmins = async (req, res) => {
    try {
        let admins = [];
        admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAdminDetailsFromEmail = async (req, res) => {
    try {
        const { adminEmail } = req.params;
        const foundUser = await Admin.findOne({ email: adminEmail }).exec();
        if (!foundUser) {
            console.log(`admin with email ${adminEmail} not found.`);
            return res.status(401).json({ error: 'User not found' });
        }

        res.status(200).json({ client: foundUser });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Add a new Admin
const addAdmin = async (req, res) => {
    let admin = new Admin(req.body);
    admin.save()
        .then(game => {
            res.status(200).json("Admin Added Successfully");
        })
        .catch(err => {
            res.status(400).send("Something Went Wrong");
        })

};

//Delete Admin
const deleteAdmin = async (req, res) => {
    Admin.findByIdAndRemove({ _id: req.params.id }, function (err, Admin) {
        if (err) res.json(err);
        else res.json("Admin Deleted Succesfully");
    });
};

module.exports = {
    getAdmins,
    getAdminDetailsFromEmail,
    addAdmin,
    deleteAdmin
}