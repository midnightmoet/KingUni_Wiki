const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utilities/auth');

// LOGIN
router.get('/login', controllers.user.get.login);
router.post('/login', controllers.user.post.login);

// REGISTER
router.get('/register', controllers.user.get.register);
router.post('/register', controllers.user.post.register);

// LOGOUT
router.get('/logout', auth(), controllers.user.get.logout);

module.exports = router;