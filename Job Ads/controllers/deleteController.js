const router = require('express').Router();
const adService = require('../services/adService.js');

router.get('/delete/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect('/404');
    }

    try {
        await adService.deleteAd(req.params.id);

        return res.redirect('/catalog');
    } catch (error) {
        return res.status(403).redirect('/404');
    }
})

module.exports = router;