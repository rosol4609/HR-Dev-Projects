const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    surname: String,
    username: {type: String, unique: true},
    email: String,
    password: String,
    phone_number: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profileImageUrl: String
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
