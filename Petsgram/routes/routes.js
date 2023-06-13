const router = require('express').Router();

const homeController = require('../controllers/homeController.js');
const pageNotFoundController = require('../controllers/404.js');
const authController = require('../controllers/authController.js');
const photoController = require('../controllers/photoController.js');
const profileController = require('../controllers/profileController.js');

router.use(homeController);
router.use(authController);
router.use(photoController);
router.use(profileController);
router.use(pageNotFoundController);

module.exports = router;