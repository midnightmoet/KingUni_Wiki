//NPM Library imports
const router = require('express').Router();  //<- this is a way to combine lines 3 and 4 and make it more efficient
// const express = require('express');
// const router = express.Router(); 

// Controllers
const controllers = require('../controllers'); 

// Middleware aka Utilities  
const auth = require('../utilities/auth'); 

// LOGIN with GET and POST
router.get('/login', controllers.user.get.login);
router.post('/login', controllers.user.post.login);

// REGISTER
router.get('/register', controllers.user.get.register);
router.post('/register', controllers.user.post.register);

// LOGOUT
router.get('/logout', auth(), controllers.user.get.logout);

module.exports = router;

// 8/28