const jst = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authoriation'];
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jst.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;