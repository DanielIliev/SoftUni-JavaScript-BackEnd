const router = require('express').Router();
const gameService = require('../services/gameService.js');

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const game = await gameService.getOneGame(id);

        if (req.user) {
            const user = req.user.username;

            if (req.user._id == game.owner.toString()) {
                const isOwner = true;

                return res.render('game/details', { title: 'Details page - Gaming Team', user, game, isOwner });
            }

            if (game.boughtBy.includes(req.user._id)) {
                const bought = true;
                
                return res.render('game/details', { title: 'Details page - Gaming Team', user, game, bought });
            }

            return res.render('game/details', { title: 'Details page - Gaming Team', user, game });
        }

        res.render('game/details', { title: 'Details page - Gaming Team', game });
    } catch (error) {
        return res.redirect('/');
    }
});

module.exports = router;