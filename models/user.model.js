const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  fullName: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false},
  path: String,
  avatarUrl: String,
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
