const jwt = require('jsonwebtoken');
const secretKey = 'athenarspassword';

const createJWT = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '1d' });
};

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.sendStatus(401);
    } else {
        if (!authorization.startsWith('Bearer ')) {
            res.sendStatus(403);
        } else {
            const token = authorization.split(' ')[1];
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    res.sendStatus(403);
                }

                req.user = user;
                next();
            });
        }
    }
}

module.exports = { createJWT, verifyJWT };