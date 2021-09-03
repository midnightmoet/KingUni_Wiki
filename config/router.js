const routers = require('../routers');
const controllers = require('../controllers'); //This has specific controllers that have the gets and posts within it
const auth = require('../utilities/auth'); //Used the full word instead of an abbreviation because it made sense

module.exports = (app) => {
    app.use('/', routers.home);
    
    app.use('/user', routers.user);

    app.use('/article', routers.article);

    app.use('*', (req, res, next) => {
        res.send('<h1>WHOOPS, PAGE NOT FOUND!</h1>');
    });
};

// 8/31 changed the file name routes.js to router.js AND also made sure to fix the name in the main index.js file