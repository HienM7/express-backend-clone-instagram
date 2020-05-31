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

module.exports.like = async (req, res) => {
  const token = req.body.token;
  const postId = req.body.postId;
  const like = req.body.like;
  try {
    const tokenVerify = jwt.verify(token, 'secretkey')
    const {userId} = tokenVerify;
    let user = await User.findOne({id: userId});

    if (!user) {
      res.json({success: false, message: "wrong username"})
      return;
    }
    
    let post = await Post.findOne({id: postId});
    if (!post) {
    res.json({success: false, message: "wrong post"})
    return;
    }
    await Post.updateOne(
      {id: postId},
      {["like." + userId]: like}
    );
    res.json({success: true})
  } catch (e) {
    console.log(e);  
    res.json({success: false})
  }
}
