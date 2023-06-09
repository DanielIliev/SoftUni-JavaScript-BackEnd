const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/details/:id', async (req, res) => {
    if (!req.user) {
        try {
            const ad = await adService.getAdById(req.params.id);

            return res.render('ad/details', { title: 'Details page', ad });
        } catch (error) {
            return res.status(404).redirect('/404');
        }
    }

    try {
        const ad = await adService.getAdById(req.params.id);
        const user = req.user;

        if (user._id === ad.author.toString()) {
            return res.render('ad/details', { title: 'Details page', ad, user, isOwner: true });
        }

        if (ad.usersApplied.includes(user._id)) {
            return res.render('ad/details', { title: 'Details page', ad, user, hasApplied: true });
        }

        const applicantsCount = ad.usersApplied.length;

        return res.render('ad/details', { title: 'Details page', ad, user, applicantsCount });
    } catch (error) {
        return res.status(404).redirect('/404');
    }
});

module.exports = router;