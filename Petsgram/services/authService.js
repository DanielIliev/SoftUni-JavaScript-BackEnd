const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.findByUsername = async (username) => User.findOne({ username });

exports.findByEmail = async (email) => User.findOne({ email });

exports.getUserById = async (id) => User.findOne({ '_id': id }).lean();

exports.login = async (username, password) => {
    // Check for empty fields
    if (!username || !password) {
        throw new Error('All fields are required');
    }
    // User exists
    const user = await this.findByUsername(username);

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

exports.register = async (credentials) => {
    const { username, email, password, repass } = credentials;
    if (password != repass) {
        throw new Error('Passwords mismatch');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    // Login newly created user
    return await this.login(username, password);
}