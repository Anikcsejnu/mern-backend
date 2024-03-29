const jwt = require('jsonwebtoken');
require('dotenv').config;

const verifyJWT = (req, res, next) => {
    const authheader = req.headers.authorization || req.headers.Authorization;
    if (!authheader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authheader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // invalid token, forbidden
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT;