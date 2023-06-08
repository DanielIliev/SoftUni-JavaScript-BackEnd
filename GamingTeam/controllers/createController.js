const gameService = require('../services/gameService.js');

const router = require('express').Router();

router.get('/create', (req, res) => {
    if (req.user) {
        const user = req.user.username;

        return res.render('game/create', { title: 'Create game - Gaming Team', user });
    }

    res.render('game/create', { title: 'Create game - Gaming Team' });
});

router.post('/create', async (req, res) => {
    req.body.owner = req.user._id;

    const { platform, name, imageUrl, price, genre, description, owner } = req.body;
    const user = req.user.username;

    try {
        await gameService.create(platform, name, imageUrl, price, genre, description, owner);
    } catch (error) {
        const errorMessage = error.message;

        return res.render('game/create', { title: 'Create game - Gaming Team', user, errorMessage });
    }

    res.redirect('/catalog');
});

module.exports = router;