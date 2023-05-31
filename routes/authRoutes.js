const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {userValidation} = require('../validation/inputValidation');

router.post('/api/signup', userValidation, authController.signup);
router.post('/api/login', authController.login);

module.exports = router;