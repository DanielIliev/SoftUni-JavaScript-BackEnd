const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.findByUsername = async (username) => User.findOne({ username }).lean();

exports.findByEmail = async (email) => User.findOne({ email }).lean();

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
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}

exports.register = async (email, password, repass, skills) => {
    // Check for empty fields
    if (!email || !password || !repass || !skills) {
        throw new Error('All fields are required');
    }

    // Email pattern validation e.g. petar@softuni.bg and only with English letters
    const emailPattern = new RegExp(/^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+/, 'gi');

    if (!email.match(emailPattern)) {
        throw new Error('Email not in a valid format. Example: petar@softuni.bg with only English letters allowed');
    }

    // Validate email length
    if (email.length < 10) {
        throw new Error('Email must be at least 10 characters long');
    }

    // Validate password length
    if (password.length < 5) {
        throw new Error('Password must be at least 5 characters long');
    }

    // Validate password
    if (password != repass) {
        throw new Error('Password mismatch');
    }

    // Set skills length limit
    if (skills.length > 40) {
        throw new Error('Skills description must be 40 characters max');
    }

    // Verify if user already exists
    const userExists = await this.findByEmail(email);

    console.log(userExists);
    if (userExists) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, descriptionOfSkills: skills });

    // Get newly created user
    const user = await this.findByEmail(email);

    // Generate token
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}