//NPM Library imports
const router = require('express').Router();
//Controllers
const controllers = require('../controllers');

//Middleware aka utilities
const auth = require('../utilities/auth');

//GET and POST create a new article
router.get('/create', auth(), controllers.article.get.create);
router.post('/create', auth(), controllers.article.post.create);

//GET all articles
router.get('/all', controllers.article.get.all);

//GET and POST details for articles
router.get('/details/:id', auth(false), controllers.article.get.details);
router.post('/details/:id', auth(false), controllers.article.get.details);

//GET and POST for edit article
router.get('/edit/:id', auth(), controllers.article.get.edit);
router.post('/edit/:id', auth(), controllers.article.post.edit);

//GET for deleting an articles
router.get('/delete/:id', auth(), controllers.article.delete);

module.exports = router;

// this works with clicking all articles 9/3