const User = require('../model/User.ts');
const bcrypt = require('bcrypt');

const passwordReset = async (req, res) => {
    const { user, pwd, new_pwd } = req.body;
    console.log(user, " ", pwd, " ", new_pwd);
    if(!user || !pwd || !new_pwd) return res.status(400).json({'message': 'Missing required input'});
    try{
        const foundUser = await User.findOne({ username: user }).exec();
        if(!foundUser) return res.sendStatus(401); // Unauthorized
        // eval password
        const match = await bcrypt.compare(pwd, foundUser.password);
        if(match) {
            const hashedPwd = await bcrypt.hash(new_pwd, 12);
            foundUser.password = hashedPwd;
            foundUser.firstTimeLogin = false;
            foundUser.save();
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(401);
        }
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

module.exports = {
  passwordReset,
};
