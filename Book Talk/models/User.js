const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'All fields are required'],
        minLength: [4, 'Username must be at least 4 characters long'],
    },
    email: {
        type: String,
        required: [true, 'All fields are required'],
        minLength: [10, 'Email must be at least 10 characters long'],
    },
    password: {
        type: String,
        required: [true, 'All fields are required'],
        minLength: [3, 'Password must be at least 3 characters long'],
    },
});

module.exports = mongoose.model('User', userSchema);