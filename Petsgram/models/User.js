const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'All fields are required'],
        minLength: [2, 'Username should be at least 2 characters long'],
    },
    email: {
        type: String,
        required: [true, 'All fields are required'],
        minLength: [10, 'Email should be at least 10 characters long'],
    },
    password: {
        type: String,
        required: [true, 'All fields are required'],
        minLength: [4, 'Password should be at least 4 characters long'],
    },
});

module.exports = mongoose.model('User', userSchema);