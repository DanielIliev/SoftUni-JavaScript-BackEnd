const router = require('express').Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }

    res.render('auth/login', { title: 'Login page' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { title: 'Login page', errorMessage: error.message });
    }
});

router.get('/register', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }

    res.render('auth/register', { title: 'Register page' });
});

router.post('/register', async (req, res) => {
    const { username, email, password, repass } = req.body;

    try {
        await authService.register(username, email, password, repass);

        res.redirect('/');
    } catch (error) {
        res.render('auth/register', { title: 'Register page', errorMessage: error.message });
    }
});

router.get('/logout', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    
    res.clearCookie('auth');
    res.redirect('/')
});

module.exports = router;