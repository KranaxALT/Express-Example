const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        if (!authheader || !authheader.startsWith('Bearer ')) {
            return res.status(401).send('No token provided');
        }
        const token = authheader.split(' ')[1];
        if (!token || token === 'undefined' || token === 'null' || token.length < 20) {
            return res.status(401).send('Token malformed or invalid format');
        }
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded.user
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send('Token invalid');
    }
}