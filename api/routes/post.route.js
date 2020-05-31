const express = require('express');
const router = express.Router();


const postController = require('../controllers/post.controller'); 

router.get('/get', postController.getPost);

module.exports = router;