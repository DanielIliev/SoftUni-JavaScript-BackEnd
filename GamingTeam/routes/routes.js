const router = require('express').Router();

const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const catalogController = require('../controllers/catalogController.js');
const logoutController = require('../controllers/logoutController.js');
const searchController = require('../controllers/searchController.js');
const createController = require('../controllers/createController.js');
const detailsController = require('../controllers/detailsController.js');
const editController = require('../controllers/editController.js');
const buyController = require('../controllers/buyController.js');
const deleteController = require('../controllers/deleteController.js');
const pageNotFoundController = require('../controllers/404.js');

router.use(homeController);
router.use(authController);
router.use(catalogController);
router.use(createController);
router.use(detailsController);
router.use(searchController);
router.use(buyController);
router.use(editController);
router.use(deleteController);
router.use(logoutController);
router.use(pageNotFoundController);

module.exports = router;