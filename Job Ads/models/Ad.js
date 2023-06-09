const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.ObjectId
    },
    usersApplied: {
        type: Array
    },
})

module.exports = mongoose.model('Ad', adSchema);