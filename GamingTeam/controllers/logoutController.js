const router = require('express').Router();

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    delete(req.user);
    res.redirect('/');
});

module.exports = router;