const Article = require('../models/articleModal');
const User = require('../models/userModal');
const mongoose = require('mongoose');

const createArticle = async (userId, title, description) => {
      const objectId = new mongoose.Types.ObjectId(userId);

      const user = await User.findById({_id: objectId});
      console.log(user);
      if (!user) {
        throw new Error('User not found');
      }
  
      const newArticle = new Article({
        title,
        description,
        authorID: userId,
      });
  
      const savedArticle = await newArticle.save();
      return savedArticle;
  };


  const getAllArticles = async () => {
      const articles = await Article.find({}, { createdAt: 0, updatedAt: 0 , __v:0})
      .populate('authorID', { password:0,createdAt: 0, updatedAt: 0 , __v:0})
      .exec();
      return articles;
  };
  

module.exports = {
  getAllArticles,
  createArticle,
};
