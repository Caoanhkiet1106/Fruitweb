const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validateRegister = require('../middlewares/validateRegister');
// User registration route
router.post('/register', validateRegister, authController.registerUser);
// User login route
router.post('/login', authController.LoginUser);

module.exports = router;