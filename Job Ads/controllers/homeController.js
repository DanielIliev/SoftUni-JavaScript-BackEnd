const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.user) {
        const user = true;
        
        return res.render('home', { title: 'Home page', user});
    }
    res.render('home', { title: 'Home page'});
});

module.exports = router;