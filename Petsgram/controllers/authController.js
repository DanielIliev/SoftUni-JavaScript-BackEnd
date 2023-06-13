const router = require('express').Router();
const { isAuth } = require('../middlewares/userState.js');
const authService = require('../services/authService.js');

router.get('/login', isAuth, (req, res) => {
    res.render('auth/login', { title: 'Login page' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { title: 'Login page', errorMessage: error.message });
    }
});

router.get('/register', isAuth, (req, res) => {
    res.render('auth/register', { title: 'Register page' });
});

router.post('/register', async (req, res) => {
    try {
        const token = await authService.register({ ...req.body });

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        const errorMessage = errorHandler(error);
        res.render('auth/register', { title: 'Register page', errorMessage });
    }
});

router.get('/logout', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }

    res.clearCookie('auth');
    res.redirect('/');
});

function errorHandler(error) {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(value => value.message);

        return errors[0];
    } else {
        return error.message;
    }
}

module.exports = router;