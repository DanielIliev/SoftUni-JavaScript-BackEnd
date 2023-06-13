const { isGuest } = require('../middlewares/userState');
const authService = require('../services/authService.js');
const photoService = require('../services/photoService');
const router = require('express').Router();

router.get('/profile/:id', isGuest, async (req, res) => {
    const user = await authService.getUserById(req.params.id);
    const photos = await photoService.getAuthorPhotos(req.params.id);

    res.render('profile', { title: 'Profile page', user, photos, photosCount: photos.length });
});

module.exports = router;