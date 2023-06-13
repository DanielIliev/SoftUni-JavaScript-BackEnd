const router = require('express').Router();
const { isGuest } = require('../middlewares/userState.js');
const photoService = require('../services/photoService.js');
const authService = require('../services/authService.js');

// Catalog page
router.get('/catalog', async (req, res) => {
    try {
        const photos = await photoService.getAllPhotos();

        if (req.user) {
            return res.render('photos/catalog', { title: 'Catalog page', user: req.user, photos });
        }

        return res.render('photos/catalog', { title: 'Catalog page', photos });
    } catch (error) {
        console.log(error.message);
    }
});

// Create page
router.get('/add', isGuest, (req, res) => {
    res.render('photos/create', { title: 'Create page', user: req.user });
});

router.post('/add', async (req, res) => {
    try {
        req.body.owner = req.user._id;
        await photoService.create({ ...req.body });

        return res.redirect('/catalog');
    } catch (error) {
        const errorMessage = errorHandler(error);
        return res.render('photos/create', { title: 'Create page', user: req.user, errorMessage });
    }
});

// Details page
router.get('/details/:id', async (req, res) => {
    try {
        const photo = await photoService.getPhotoById(req.params.id);
        const author = await authService.getUserById(photo.owner.toString());
        photo.ownerName = author.username;
        const comments = photo.commentList;

        if (comments.length != 0) {
            for (const comment of comments) {
                const commentatorData = await authService.getUserById(comment.userId.toString());
                comment.name = commentatorData.username;
            }
        }

        if (req.user) {
            const isOwner = author._id.toString() === req.user._id;

            return res.render('photos/details', { title: 'Details page', user: req.user, photo, isOwner, comments });
        }

        return res.render('photos/details', { title: 'Details page', photo });
    } catch (error) {
        return res.status(404).redirect('/404');
    }
});

// Add Comment
router.post('/comment/:photoId/:comentatorId', async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const comentatorId = req.params.comentatorId;
        const comment = req.body.comment;

        await photoService.addComment(photoId, comentatorId, comment);

        res.redirect(`/details/${photoId}`);
    } catch (error) {
        console.log(error.message);
    }
});

// Edit
router.get('/edit/:id', isGuest, async (req, res) => {
    const photo = await photoService.getPhotoById(req.params.id);

    if (req.user._id != photo.owner.toString()) {
        return res.redirect('/catalog');
    }

    res.render('photos/edit', { title: 'Edit page', user: req.user, photo });
});

router.post('/edit/:id', async (req, res) => {
    try {
        await photoService.editPhoto(req.params.id, { ...req.body });

        return res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        const errorMessage = errorHandler(error);
        const photo = await photoService.getPhotoById(req.params.id);

        return res.render('photos/edit', { title: 'Edit page', user: req.user, photo, errorMessage });
    }
});

// Delete
router.get('/delete/:id', async (req, res) => {
    try {
        await photoService.deletePhoto(req.params.id);

        return res.redirect('/catalog');
    } catch (error) {
        return res.status(404).redirect('/404');
    }
});

// Helper functions
function errorHandler(error) {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(value => value.message);

        return errors[0];
    } else {
        return error.message;
    }
}

module.exports = router;