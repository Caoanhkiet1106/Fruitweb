const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');

// User registration route
router.post('/register', userController.registerUser);

module.exports = router;