const router = require('express').Router();
const express = require('express');

const homeController = require('../controllers/homeController.js');
const pageNotFoundController = require('../controllers/404.js');
const authController = require('../controllers/authController.js');
const logoutController = require('../controllers/logoutController.js');
const createController = require('../controllers/createController.js');
const catalogController = require('../controllers/catalogControllers.js');
const detailsController = require('../controllers/detailsController.js');
const editController = require('../controllers/editController.js');
const deleteController = require('../controllers/deleteController.js');
const searchController = require('../controllers/searchController.js');
const addController = require('../controllers/addController.js');

router.use(homeController);
router.use(authController);
router.use(logoutController);
router.use(createController);
router.use(catalogController);
router.use(['/details', '/edit'], express.static('public'));
router.use(detailsController);
router.use(addController);
router.use(editController);
router.use(deleteController);
router.use(searchController);
router.use(pageNotFoundController);

module.exports = router;