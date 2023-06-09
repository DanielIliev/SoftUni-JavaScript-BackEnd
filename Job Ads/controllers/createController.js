const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/create', (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    const user = req.user;

    res.render('ad/create', { title: 'Create page', user });

});

router.post('/create', async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    try {
        const { headline, location, companyName, companyDescription, ownerId } = req.body;

        await adService.createAd(headline, location, companyName, companyDescription, ownerId);

        return res.redirect('/catalog');
    } catch (error) {
        const errorMessage = error.message;
        
        return res.render('ad/create', { title: 'Create page', user: req.user, errorMessage });
    }
});

module.exports = router;