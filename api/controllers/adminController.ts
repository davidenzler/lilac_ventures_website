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
    addAdmin,
    deleteAdmin
}