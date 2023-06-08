const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    boughtBy: {
        type: Array // References to the User model -> User.find() ?
    },
    owner: {
        type: mongoose.ObjectId // type is ObjectId -> a reference to the User model -> probably the creator of the game
    }
});

module.exports = mongoose.model('Game', GameSchema);