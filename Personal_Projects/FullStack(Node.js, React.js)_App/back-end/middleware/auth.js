require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function generateToken(user) {
    const token = jwt.sign({id: user.id, role: user.role}, secret, { expiresIn: '1h' });
    return token;
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']? req.headers['authorization'].split(' ')[1] : null;
    if (!token) return res.status(401).json({ error: 'Token required' });
    
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ error: 'Access denied' });
        next();
    };
}

module.exports = { generateToken, authenticateToken, authorizeRole };
