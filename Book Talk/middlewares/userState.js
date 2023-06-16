exports.isGuest = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }

    next();
}

exports.isAuth = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
}