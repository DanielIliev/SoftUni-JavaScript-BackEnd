const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/add/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    try {
        const ad = await adService.getAdById(req.params.id);

        await adService.applyForAd(ad._id, req.user._id);

        return res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        
    }
});

module.exports = router;