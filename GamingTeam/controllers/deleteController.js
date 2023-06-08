const router = require('express').Router();
const gameService = require('../services/gameService.js');

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await gameService.deleteGame(id);

        return res.redirect('/catalog');
    } catch (error) {
        return res.redirect('/catalog');
    }

})

module.exports = router;