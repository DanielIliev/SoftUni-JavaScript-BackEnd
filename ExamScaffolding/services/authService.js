const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.findByUsername = async (username) => User.findOne({ username });

exports.findByEmail = async (email) => User.findOne({ email });

exports.login = async (email, password) => {
    // Check for empty fields
    if (!email || !password) {
        throw new Error('All fields are required');
    }
    // User exists
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Password is valid
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}

exports.register = async (username, email, password, repass) => {
    // Check for empty fields
    if (!username || !email || !password || !repass) {
        throw new Error('All fields are required');
    }

    // Validate username length
    if (username.length < 4) {
        throw new Error('Username must be at least 4 characters long');
    }

    // Validate email length
    if (email.length < 10) {
        throw new Error('Email must be at least 10 characters long');
    }

    // Validate password
    if (password != repass) {
        throw new Error('Password mismatch');
    }

    // Validate if user already exists
    const existingUser = User.findOne({
        $or: [
            { username },
            { email },
        ]
    });

    if (existingUser.length != 0) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({ username, email, password: hashedPassword });
}