const jwt = require('jsonwebtoken');
const User = require('../model/User.ts');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

    const foundUser = await User.findOne({ refreshToken }).exec();
    
    // Detected refresh token reuse!
    if(!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            async (err, decoded) => {
                if(err) return res.sendStatus(403);
                const hackedUser = await User.findOne({ username: decoded.user}).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        );
        return res.sendStatus(403);
    } 

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    // valid token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        async (err, decoded) => {
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            // Refresh Token stil valid
            const roles = foundUser.roles;
            const accessToken = jwt.sign(
                {
                    "username": decoded.username,
                    "roles": decoded.roles
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '10m'}
            );

            const newRefreshToken = jwt.sign(
                {"username": foundUser.username },
                process.env.REFRESH_TOKEN,
                {expiresIn: '1d'}
            );
            // save new refresh toke with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
            res.json({ roles, accessToken });
        }
    )
}

module.exports = { handleRefreshToken }