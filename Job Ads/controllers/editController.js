const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/edit/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    try {
        const ad = await adService.getAdById(req.params.id);

        return res.render('ad/edit', { title: 'Edit page', user: req.user, ad });
    } catch (error) {
        return res.status(404).redirect('/404');
    }
});

router.post('/edit', async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    try {
        const { headline, location, companyName, companyDescription, adId } = req.body;

        await adService.editAd(adId, headline, location, companyName, companyDescription);

        return res.redirect(`/details/${adId}`);
    } catch (error) {
        const errorMessage = error.message;
        const ad = await adService.getAdById(req.body.adId);

        return res.render('ad/edit', {title: 'Edit page', user: req.user, ad, errorMessage});
        // TODO Show correct error message with res.render
    }
});

module.exports = router;