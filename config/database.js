const config = require('./config');
const mongoose = require('mongoose');
const dbName = 'project'; // CONFIGURE DATABASE NAME

module.exports = () => {
    return mongoose.connect(config.dbUrl + dbName, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }, console.log("DATABASE CONNECTED!")); 
};