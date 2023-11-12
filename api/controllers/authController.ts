const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User }= require('../model/User.ts')

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { user, pass } = req.body;
    if(!user || !pass) return res.status(400).json({'message': 'Username and password are required'});

    const foundUser = await User.findOne({ username: user }).exec();
    if(!foundUser) return res.sendStatus(401); // Unauthorized

    // eval password
    const match = await bcrypt.compare(pass, foundUser.password);
    if(match) {
        // create jwt
        const roles = foundUser.roles;
        const accessToken = jwt.sign(
            {
                "username": foundUser.username,
                "roles": roles
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '10m' }
        );
        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d' }
        );

        let newRefreshTokenArray = 
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);
        if(cookies?.jwt) {
            //reuse dection
            const refreshToken = cookies.jwt;
            const foundtoken = await User.findOne({ refreshToken }).exec();

            // detected reuse
            if (!foundtoken) {
                newRefreshTokenArray = [];
            }
            
            res.clearCookie();
        }

        // save refresh token in db
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();
        res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json( { accessToken });
    } else  {
        res.sendStatus(401);
    }
} 

module.exports = { handleLogin }