const router = require('express').Router();

const homeController = require('../controllers/homeController.js');
const pageNotFoundController = require('../controllers/404.js');
const authController = require('../controllers/authController.js');

router.use(homeController);
router.use(authController);
router.use(pageNotFoundController);

module.exports = router;