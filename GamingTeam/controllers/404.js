const router = require('express').Router();

router.get('*', (req, res) => {
    if (req.user) {
        const user = req.user.username;

        return res.render('404/index', { title: 'Page not found - Gaming Team', user });
    }
    res.render('404/index', { title: 'Page not found - Gaming Team' });
});

module.exports = router;