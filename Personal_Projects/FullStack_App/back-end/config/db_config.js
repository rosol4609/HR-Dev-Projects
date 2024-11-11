const mongoose = require('mongoose');
    
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/MyDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDb;


