const router = require('express').Router();
const gameService = require('../services/gameService.js');

router.get('/search', async (req, res) => {
    if (req.user) {
        const user = req.user.username;

        const games = await gameService.getAllGames();

        return res.render('search', { title: 'Search page - Gaming Team', user, games });
    }

    res.render('search', { title: 'Search page - Gaming Team' });
});

router.post('/search', async (req, res) => {
    try {
        const gameName = req.body.name;
        const gamePlatform = req.body.platform;
        const user = req.user.username;
        const games = await gameService.getGamesByCriteria(gameName, gamePlatform);

        return res.render('search', { title: 'Search page - Gaming Team', user, games });
    } catch (error) {
        return res.redirect('/search');
    }
});

module.exports = router;