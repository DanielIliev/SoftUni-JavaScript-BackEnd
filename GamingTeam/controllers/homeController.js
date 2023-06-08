const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.user) {
        const user = req.user.username;

        return res.render('home/index', { title: 'Home page - Gaming Team', user });
    }

    res.render('home/index', { title: 'Home page - Gaming Team' });
});

module.exports = router;