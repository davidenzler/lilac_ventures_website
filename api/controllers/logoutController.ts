const User = require('../model/User.ts');

const handleLogout = async (req, res) => {
    // On client also delete accessToken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser) {
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }
    // delete refresh token from db
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);
}

module.exports = { handleLogout }