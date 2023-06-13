const mongoose = require('mongoose');
const allFieldsMessage = 'All fields are required';

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, allFieldsMessage],
        minLength: [2, 'Name should be at least 2 characters long'],
    },
    image: {
        type: String,
        required: [true, allFieldsMessage],
        validate: [/^(http|https):\/\//, 'Image should start with http:// or https://'],
    },
    age: {
        type: Number,
        required: [true, allFieldsMessage],
        // Based on documentation length should be from 1 to 100
        minLength: [1, 'Age length should be at least 1'],
        maxLength: [100, 'Age exceeds the maximum length of 100'],
        // ----------------
        min: [1, 'Age should be at least a value of 1'],
        max: [100, 'Age exceeds the maximum value of 100'],
    },
    description: {
        type: String,
        required: [true, allFieldsMessage],
        minLength: [5, 'Description should be at least 5 characters long'],
        maxLength: [50, 'Description should be a maximum of 50 characters'],
    },
    location: {
        type: String,
        required: [true, allFieldsMessage],
        minLength: [5, 'Description should be at least 5 characters long'],
        maxLength: [50, 'Description should be a maximum of 50 characters'],
    },
    commentList: [
        {
            'userId': {
                type: String
            },
            'comment': {
                type: String
            }
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Photo', photoSchema);


// name – string (required)
// • image – string (required)
// • age – number (required)
// • description – string (required)
// • location – string (required)
// • commentList – an array of objects containing the user's ID and the comment content: [ { userID: '1234', 
// comment: 'Nice photo!'} ]
// • owner – object ID (a reference to the User model