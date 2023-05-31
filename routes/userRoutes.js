const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT} = require("../validation/tokenValidation")

router.put('/:userId', authenticateJWT, userController.updateUser);

module.exports = router;
