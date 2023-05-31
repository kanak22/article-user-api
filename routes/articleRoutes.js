const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const {articleValidation} = require("../validation/inputValidation")
const { authenticateJWT} = require("../validation/tokenValidation")

router.post('/users/:userId/articles', authenticateJWT, articleValidation,  articleController.createArticle);
router.get('/articles', authenticateJWT, articleController.getAllArticles);

module.exports = router;
