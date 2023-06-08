const router = require('express').Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login page - Gaming Team' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { title: 'Login page - Gaming Team', errorMessage: error.message });
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register page - Gaming Team' });
});

router.post('/register', async (req, res) => {
    const { username, email, password, repass } = req.body;

    try {
        await authService.register(username, email, password, repass);
        res.render('home', { title: 'Home page - Gaming Team' });
    } catch (error) {
        res.render('auth/register', { title: 'Register page - Gaming Team', errorMessage: error.message });
    }
});

module.exports = router;