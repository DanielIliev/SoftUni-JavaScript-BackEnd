const router = require('express').Router();
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login page' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        return res.redirect('/');
    } catch (error) {
        return res.render('auth/login', { title: 'Login page', errorMessage: error.message });
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register page' });
});

router.post('/register', async (req, res) => {
    const { email, password, repass, skills } = req.body;

    try {
        const token = await authService.register(email, password, repass, skills);
        
        res.cookie('auth', token);

        return res.redirect('/');
    } catch (error) {
        return res.render('auth/register', { title: 'Register page', errorMessage: error.message });
    }
});

module.exports = router;