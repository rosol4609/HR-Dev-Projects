require('dotenv').config();
const express = require('express'); 
const User = require('./models/User');
const connectDb = require('./config/db_config');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController')
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 5000;

connectDb().then(() => {
    console.log('MongoDB connected');
    authController.createAdmin();
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRoutes);

app.post('/api/register', authController.register)
app.post('/api/login', authController.login);
app.post('/api/delete_user', authController.delete_user);
app.post('/api/createAdmin', authController.createAdmin);

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello, Node.js from backend!' });
    });

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = server;

