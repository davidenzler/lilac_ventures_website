const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User.ts');


const handleLogin = async (req, res) => {
    const { user, pass } = req.body;
    if(!user || !pass) return res.status(400).json({'message': 'Username and password required'});
    const foundUser = await User.findOne({ username: user }).exec();
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pass, foundUser.password);
    if(match) {
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN,
            { expiresIn: '10m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d' }
        );
        // save refresh token in db
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json( { accessToken });
    } else  {
        res.sendStatus(401);
    }
} 

module.exports = { handleLogin }