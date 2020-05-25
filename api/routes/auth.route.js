const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller'); 


router.post('/login', authController.postLogin);
router.post('/isLoggedIn', authController.isLoggedIn);
router.post('/register', authController.register);


module.exports = router;
