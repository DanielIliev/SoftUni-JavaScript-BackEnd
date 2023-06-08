const router = require('express').Router();
const gameService = require('../services/gameService.js');

router.get('/buy/:id', async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user._id;

    try {
        await gameService.buyGame(gameId, userId);

        return res.redirect(`/details/${gameId}`);
    } catch (error) {
        return res.redirect(`/details/${gameId}`);
    }
});

module.exports = router;