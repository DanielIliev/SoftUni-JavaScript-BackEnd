const { isGuest } = require('../middlewares/userState');
const bookService = require('../services/bookService.js');
const router = require('express').Router();

router.get('/profile/:id', isGuest, async (req, res) => {
    try {
        const wishingList = await bookService.getWishedList(req.user._id);

        console.log(wishingList);
        return res.render('profile', { title: 'Profile page', user: req.user, wishingList });
    } catch (error) {
        console.log(error);
        return res.status(404).redirect('/404');
    }
});

module.exports = router;