const { User } = require('../model/User.ts');

const handleLogout = async (req, res) => {
    // On client also delete accessToken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // No Content
    const refreshToken = cookies.jwt;

    // is refreshtoken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

    // delete refresh token from db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);
}

module.exports = { handleLogout }