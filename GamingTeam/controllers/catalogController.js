const router = require('express').Router();
const gameService = require('../services/gameService.js');

router.get('/catalog', async (req, res) => {

    try {
        const games = await gameService.getAllGames();

        if (req.user) {
            const user = req.user.username;

            return res.render('catalog', { title: 'Catalog page - Gaming Team', games, user });
        }

        return res.render('catalog', { title: 'Catalog page - Gaming Team', games });
    } catch (error) {
        console.log(error);
    }


    res.render('catalog', { title: 'Catalog page - Gaming Team' });
});

module.exports = router;