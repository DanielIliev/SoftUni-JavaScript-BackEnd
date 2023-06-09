const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/search', (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    res.render('search', { title: 'Search page', user: req.user });
});

router.post('/search', async (req, res) => {
    try {
        const searchResults = await adService.searchAds(req.body.search);
        const searched = true;

        return res.render('search', { title: 'Search page', user: req.user, searchResults, searched });
    } catch (error) {
        const errorMessage = error.message;

        return res.render('search', { title: 'Search page', user: req.user, errorMessage });
    }
});

module.exports = router;