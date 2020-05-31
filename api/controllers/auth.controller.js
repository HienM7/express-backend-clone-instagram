const User = require('../../models/user.model');
const shortId = require('shortid');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({email: email});

  if(!user) {
      res.json({ 
        success: false,
      })
      return;
  }
  
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    res.json({ success: false  })
    return;
  }
  jwt.sign({userId: user.id}, process.env.SECRET_KEY , function(err, token) {
    res.json({
    userId: user.id,
    username: user.name,
    avatarUrl: user.avatarUrl,
    success: true,
    token: token
  })
  });
};

module.exports.isLoggedIn = async (req, res) => {
  const token = req.body.token;
  try {
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY)
    console.log(tokenVerify);
    const { userId } = tokenVerify
    const user = await User.findOne({id: userId});
    if(!user) {
      res.json({ 
        success: false,    
    });
      return;
  }
  res.json({ 
    success: true,
    username: user.username,
    userId: user.id,
    avatarUrl: user.avatarUrl
  })
  }  catch(e) {
    res.json({ 
        success: false,    
   });
  }

}

module.exports.register = async (req, res) => {

  const email = req.body.email;
  let password = req.body.password;
  const username = req.body.username;
  const fullName = req.body.fullName;
  const checkEmail = await User.findOne({email: email});
  if(checkEmail) {
    res.json({
      success: false, 
      message: "The email is taken. Try another"       
    });
    return;
  }

  password = await bcrypt.hash(password, 10);
  const newUser = {
      id: shortId.generate(),
      username: username,
      fullName: fullName,
      email: email,
      password: password,
  }
   try {
    await User.create(newUser);
    jwt.sign({userId: newUser.id}, process.env.SECRET_KEY, function(err, token) {
      res.json({
      userId: newUser.id,
      username: newUser.name,
      token: token,
      success: true
    });
    });
   
   } catch (e) {
     console.log(e);
     res.json({
       success: false
     });
     return;
   }
  
}
