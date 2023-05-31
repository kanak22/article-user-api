const articleService = require('../services/articleService');

const createArticle = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, description } = req.body;

    const newArticle = await articleService.createArticle(userId, title, description);
    return res.status(200).send({
      statusCode: 201,
      data: {
        data: newArticle
      },
      error: "NA",
      message: "NA",
    })
  } catch (error) {
    console.log(error);
    if (error.message === 'User not found') {
      return res.status(400).send({
        statusCode: 400,
        data: {
          data: {},
        },
        error: error.message,
        message: "Internal Server Error",
      });
    }
    return res.status(500).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: error.message,
      message: "Internal Server Error",
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    return res.status(200).send({
      statusCode: 200,
      data: {
        data: articles
      },
      error: "NA",
      message: "NA",
    })
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      data: {
        data: {},
      },
      error: error.message,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createArticle,
  getAllArticles
};
