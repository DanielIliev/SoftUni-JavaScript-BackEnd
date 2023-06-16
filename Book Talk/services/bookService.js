const Book = require('../models/Book.js');

exports.getAllBooks = async () => await Book.find().lean();

exports.getById = async (id) => await Book.findOne({ '_id': id }).lean();

exports.create = async (data) => await Book.create(
    {
        title: data.title,
        author: data.author,
        image: data.image,
        review: data.review,
        genre: data.genre,
        stars: data.stars,
        owner: data.owner
    }
);

exports.edit = async (id, data) => await Book.findOneAndUpdate(
    { '_id': id },
    {
        title: data.title,
        author: data.author,
        image: data.image,
        review: data.review,
        genre: data.genre,
        stars: data.stars,
    },
    {
        runValidators: true,
    }
);

exports.wish = async (bookId, userId) => await Book.findOneAndUpdate({ '_id': bookId }, {
    $push: { wishingList: userId },
})

exports.getWishedList = async (id) => await Book.find({
    wishingList: id
}).select('image').lean();

exports.delete = async (id) => await Book.findOneAndDelete({ '_id': id });