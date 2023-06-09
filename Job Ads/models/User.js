const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    descriptionOfSkills: {
        type: String,
        required: true
    },
    myAds: {
        type: Array
    },
});

module.exports = mongoose.model('User', userSchema);