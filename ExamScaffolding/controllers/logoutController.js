const router = require('express').Router();

router.get('/logout', (req, res) => {
    if (req.cookies['auth']) {
        res.clearCookie('auth');

        return res.redirect('/');
    } else {
        return res.redirect('/');
    }
});

module.exports = router;