const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/catalog', async (req, res) => {
    if (!req.user) {
        return res.render('catalog', { title: 'Catalog page' });
    }

    try {
        const ads = await adService.getAllAds();

        return res.render('catalog', { title: 'Catalog page', ads, user: req.user });
    } catch (error) {
        return res.status(404).redirect('/404');
    }
});

module.exports = router;