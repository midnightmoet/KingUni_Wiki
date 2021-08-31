const routers = require('../routers');
const controllers = require('../controllers');
const auth = require('../utilities/auth');

module.exports = (app) => {
    app.use('/', routers.home);
    
    app.use('/user', routers.user);

    app.use('/article', routers.article);

    app.use('*', (req, res, next) => {
        res.send('<h1>PAGE NOT FOUND!</h1>');
    });
};

// 8/31 changed the file name routes.js to router.js AND also made sure to fix the name in the main index.js file