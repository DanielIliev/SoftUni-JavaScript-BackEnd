const router = require('express').Router();

router.get('*', (req, res) => {
    if (req.user) {
        const user = req.user;
        
        return res.render('404', { title: 'Page not found', user });
    }

    res.render('404', { title: 'Page not found' });
});

module.exports = router;