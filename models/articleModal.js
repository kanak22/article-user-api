const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('article', articleSchema);

module.exports = Article;