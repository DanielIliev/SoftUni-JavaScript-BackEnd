const { isGuest } = require('../middlewares/userState.js');
const bookService = require('../services/bookService.js');
const router = require('express').Router();

// Catalog
router.get('/catalog', async (req, res) => {
    try {
        const books = await bookService.getAllBooks();

        if (req.user) {
            return res.render('catalog', { title: 'Catalog page', books, user: req.user });
        }

        return res.render('catalog', { title: 'Catalog page', books });
    } catch (error) {
        console.log(error);
        return res.status(404).redirect('/404');
    }
});

// Create
router.get('/create', isGuest, (req, res) => {
    res.render('book/create', { title: 'Create page', user: req.user });
});

router.post('/create', async (req, res) => {
    try {
        req.body.owner = req.user._id;

        await bookService.create({ ...req.body });

        return res.redirect('/catalog');
    } catch (error) {
        const errorMessage = errorHandler(error);
        return res.render('book/create', { title: 'Create page', user: req.user, errorMessage });
    }
});

// Details
router.get('/details/:id', async (req, res) => {
    try {
        const book = await bookService.getById(req.params.id);
        const owner = isOwner(book, req.user._id);
        const wished = hasWished(book, req.user._id);

        if (req.user) {
            return res.render('book/details', { title: 'Details page', user: req.user, book, owner, wished });
        }

        return res.render('book/details', { title: 'Details page', book });
    } catch (error) {
        console.log(error);
        return res.status(404).redirect('/404');
    }
});

// Edit
router.get('/edit/:id', isGuest, async (req, res) => {
    try {
        const book = await bookService.getById(req.params.id);
        console.log(book);

        if (!isOwner(book, req.user._id)) {
            return res.redirect('/');
        }

        return res.render('book/edit', { title: 'Edit page', user: req.user, book });

    } catch (error) {
        return res.status(404).redirect('/404');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        await bookService.edit(req.params.id, { ...req.body });

        return res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        const errorMessage = errorHandler(error);
        const book = await bookService.getById(req.params.id);

        return res.render('book/edit', { title: 'Edit page', book, errorMessage });
    }
});

// Delete
router.get('/delete/:bookId', isGuest, async (req, res) => {
    try {
        const book = await bookService.getById(req.params.id);

        if (!isOwner(book, req.user._id)) {
            return res.redirect('/');
        }

        await bookService.delete(req.params.bookId);

        return res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        return res.status(404).redirect('/404');
    }
});

// Wish
router.get('/wish/:bookId/:userId', isGuest, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    try {
        await bookService.wish(bookId, userId);

        return res.redirect(`/details/${bookId}`);
    } catch (error) {
        console.log(error);
        return res.status(404).redirect('/404');
    }
});

// Helper function
function errorHandler(error) {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(value => value.message);

        return errors[0];
    } else {
        return error.message;
    }
}

function isOwner(book, id) {
    return book.owner.toString() === id;
}

function hasWished(book, id) {
    return book.wishingList.find((el) => el.toString() == id);
}

module.exports = router;