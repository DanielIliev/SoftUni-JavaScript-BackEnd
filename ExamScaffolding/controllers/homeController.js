const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home/index', { title: 'Home page - Gaming Team'});
});

module.exports = router;