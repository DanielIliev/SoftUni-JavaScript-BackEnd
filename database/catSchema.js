const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    photoUrl: String,
    title: String,
    description: String,
    breed: String,
}, { timestamps: true });

module.exports = mongoose.model('Cat', schema);