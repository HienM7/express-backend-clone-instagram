const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: String,
  caption: String,
  userId: String,
  author: String, 
  imageUrl: String,
  comment: [{name: String, content: String}],
  like: {type: Object, default: {}}
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
