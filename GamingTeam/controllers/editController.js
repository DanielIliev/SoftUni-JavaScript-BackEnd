const router = require('express').Router();
const gameService = require('../services/gameService.js');

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.user.username;

    try {
        const game = await gameService.getOneGame(id);

        return res.render('game/edit', { title: 'Edit page - Gaming Team', user, game });
    } catch (error) {
        return res.redirect('/');
    }
});

router.post('/edit/:id', async (req, res) => {
    const { platform, name, imageUrl, price, genre, description } = req.body;
    const user = req.user.username;
    const gameId = req.params.id;

    try {
        await gameService.edit(gameId, platform, name, imageUrl, price, genre, description);

        return res.redirect(`/details/${gameId}`);
    } catch (error) {
        const errorMessage = error.message;
        const game = await gameService.getOneGame(gameId);

        return res.render('game/edit', { title: 'Create game - Gaming Team', user, game, errorMessage });
    }
});

module.exports = router;