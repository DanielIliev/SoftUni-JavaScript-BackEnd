const mongoose = require('mongoose');
const allFieldsError = 'All fields are required';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, allFieldsError],
        minLength: [2, 'Title must be at least 2 chars long'],
    },
    author: {
        type: String,
        required: [true, allFieldsError],
        minLength: [5, 'Author must be at least 5 chars'],
    },
    image: {
        type: String,
        required: [true, allFieldsError],
        validate: [/^(http|https):\/\//, 'Image must start with http:// or https://'],
    },
    review: {
        type: String,
        required: [true, allFieldsError],
        minLength: [10, 'Review should be at least 10 chars long'],
    },
    genre: {
        type: String,
        required: [true, allFieldsError],
        minLength: [3, 'Genre must be at least 3 chars long'],
    },
    stars: {
        type: Number,
        required: [true, allFieldsError],
        min: [1, 'Stars must be in range of 1 to 5'],
        max: [5, 'Stars must be in range of 1 to 5'],
    },
    wishingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Book', bookSchema);

// ⦁	Title - String (required),
// ⦁	Author: String (required),
// ⦁	Image: String (required),
// ⦁	Book Review: String (required),
// ⦁	Genre: String (required),
// ⦁	Stars: Number (required) between 1 and 5,
// ⦁	WishingList – a collection of Users (a reference to the User model)
// ⦁	Owner - object Id (a reference to the User model)


// ⦁	The Title should be at least 2 characters
// ⦁	The Author should be at least 5 characters
// ⦁	The Genre should be at least 3 characters
// ⦁	The Stars should be a positive number between 1 and 5
// ⦁	The Image should start with http:// or https://.
// ⦁	The Review should be a minimum of 10 characters long.

