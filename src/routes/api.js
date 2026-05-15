const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');
const validateRegister = require('../middlewares/validateRegister');
// User registration route
router.post('/register', validateRegister, userController.registerUser);
// User login route
router.post('/login', userController.LoginUser);

module.exports = router;