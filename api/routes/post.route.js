const express = require('express');
const router = express.Router();


const postController = require('../controllers/post.controller'); 

router.get('/get', postController.getPost);
router.post('/like', postController.like);


module.exports = router;