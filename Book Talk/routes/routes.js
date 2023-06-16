const router = require('express').Router();
const express = require('express');
const homeController = require('../controllers/homeController.js');
const pageNotFoundController = require('../controllers/404.js');
const authController = require('../controllers/authController.js');
const bookController = require('../controllers/bookController.js');
const profileController = require('../controllers/profileController.js');

router.use(['/details', '/edit', '/profile'], express.static('public'));
router.use(homeController);
router.use(authController);
router.use(bookController);
router.use(profileController);
router.use(pageNotFoundController);

module.exports = router;