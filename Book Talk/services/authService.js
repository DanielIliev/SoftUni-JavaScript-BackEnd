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

exports.register = async (data) => {
    if (data.password != data.repass) {
        throw new Error('Passwords must match');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await User.create({ email: data.email, username: data.username, password: hashedPassword });

    // Log the registered user
    const token = this.login(data.email, data.password);

    return token;
}