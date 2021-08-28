const router = require('express').Router();
const controllers = require('../controllers');

// INDEX
router.get('/', controllers.home.get.index);
router.post('/', controllers.home.post.index);

module.exports = router;

// 8/28