const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.user) {
        return res.render('home', { title: 'Home page', user: req.user });
    }
    res.render('home', { title: 'Home page' });
});

module.exports = router;