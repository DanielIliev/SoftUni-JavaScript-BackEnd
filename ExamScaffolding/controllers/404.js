const router = require('express').Router();

router.get('*', (req, res) => {
    res.render('404/index', { title: 'Page not found - Gaming Team'});
});

module.exports = router;