const User = require('../model/User.ts');
const bcrypt = require('bcrypt');

const passwordReset = async (req, res) => {
    const { user, pwd, new_pwd } = req.body;
    if(!user || !pwd || !new_pwd) return res.status(400).json({'message': 'Missing required input'});
    try{
        const foundUser = await User.findOne({ username: user }).exec();
        if(!foundUser) return res.sendStatus(401); // Unauthorized
        // eval password
        const match = await bcrypt.compare(pwd, foundUser.password);
        if(match) {
            const hashedPwd = await bcrypt.hash(new_pwd, 12);
            foundUser.password = hashedPwd;
            foundUser.save();
            res.sendStatus(200);
        } else  {
            res.sendStatus(401);
        }
    } catch(err) {
        console.log(err);
    }
};

module.exports = {
  passwordReset,
};
