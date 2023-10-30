const bcrypt = require('bcrypt');
const User = require('../model/User.ts');

const handleNewUser = async (req, res) => {
    const {user, pwd, fName, lName} = req.body;
    if(!user || !pwd || !fName || !lName) return res.status(400).json({'message': 'Username and password required'});
    // check for duplicate usernames in DB
    const duplicate = await User.findOne({ username: user }).exec();
    if(duplicate) return res.sendStatus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 12);
        
        // create and store new user
        const result = await User.create({
            "username": user, 
            "roles": { "user": 2001 },
            "password": hashedPwd,
        });
        
        res.status(201).json({'message': 'user created'});
    } catch(err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser}