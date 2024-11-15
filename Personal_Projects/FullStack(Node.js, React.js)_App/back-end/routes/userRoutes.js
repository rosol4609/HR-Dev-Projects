const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin' });
});

router.get('/user-profile', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.role}` });
});

module.exports = router;

