const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

const shortId = require('shortid');

module.exports.getPost = async (req, res) => {
  let listPost = await Post.find();
  try {
    let listPost = await Post.find();
    for (let i = 0; i < listPost.length; ++i) {
      let user = await User.findOne({id: listPost[i].userId});
      listPost[i]._doc.author = user.username;
      listPost[i]._doc.avatarUrl = user.avatarUrl;
      for (let comment of listPost[i]._doc.comments) {
        const user = await User.findOne({id: comment.userId});
        if(!user) {
          res.json({
            success: false
          });
          return;
        }
        comment._doc.username = user.username;
        comment._doc.avatarUrl = user.avatarUrl;
        console.log(comment);
      }
    }
    res.json(listPost);
  } catch (e) {
    console.log(e);
    res.json({success: false});
  }
}