const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
        } catch (error) {
            res.clearCookie('auth');
            return res.status(401).render('404');
        }
    }

    next();
}