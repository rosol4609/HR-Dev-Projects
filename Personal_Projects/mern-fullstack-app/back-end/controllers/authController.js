const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const {name, surname, username, email, password, phone_number, role } = req.body;
    try {
        const newUser = new User({ 
            name,
            surname, 
            username, 
            email, 
            password,
            phone_number, 
            role 
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error creating user:",error);
        res.status(500).json({ error: 'Error creating user' });
    }
}

async function login(req, res) {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: email || username }, { username: email || username }] 
        });   
        if (!user) {
            console.log('User not found for:', email || username );
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        const token = generateToken(user);
        res.json({
            message: 'Login successful',
            token, 
            user: { name: user.name, email: user.email, role: user.role }});
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ error: 'Error logging in' });
    }
}

async function createAdmin() {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminData = {
            name: 'Admin',
            surname: 'User',
            username: 'admin',
            email: 'admin@example.com',
            password: adminPassword,
            phone_number: '123456789',
            role: 'admin'
        }
        const newAdmin = new User(adminData);
        await newAdmin.save();
        console.log('Admin created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

async function delete_user(req, res) {
    const { username } = req.body;
    try {
        const user = await User.findOneAndDelete({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        } else if (user.role === 'admin') {
            return res.status(400).json({ error: 'Cannot delete admin user' });
        }
        
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}

module.exports = { register, login , createAdmin , delete_user };