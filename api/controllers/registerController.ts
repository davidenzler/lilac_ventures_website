const bcrypt = require('bcrypt');
const User = require('../model/User.ts');

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    console.log("USER: ", user);
    console.log("PWD: ", pwd);
    if(!user || !pwd ){
        console.log('test');
        return res.status(400).json({'message': 'Username and password required'});
    }
    // check for duplicate usernames in DB
    const duplicate = await User.findOne({ username: user }).exec();
    if(duplicate) return res.sendStatus(409);
    try {
        const hashedPwd = await bcrypt.hash(pwd, 12);
        
        // create and store new user
        const result = await User.create({
            "username": user, 
            "roles": "user",
            "password": hashedPwd,
            "firstTimeLogin": true
        });
        
        return res.status(201).json({'message': 'user created'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser}