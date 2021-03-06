global.__basedir = __dirname;

const databaseConnector = require('./config/database');
databaseConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();
    
    require('./config/express')(app);
    require('./config/router')(app);

    const port = config.port;

    console.log("Woot woot index.js is catching");

    app.listen(port, console.log(`Listening on port ${port}!`));
}).catch(console.error);