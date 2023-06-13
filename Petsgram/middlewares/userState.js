exports.isGuest = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
}

exports.isAuth = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
    }
    next();
}