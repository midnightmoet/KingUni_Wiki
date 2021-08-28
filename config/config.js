const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 2300,
        dbUrl: 'mongodb+srv://midnightmoet:Kingsland2021!@project.twc8b.mongodb.net/project?retryWrites=true&w=majority',
        authCookie: 'auth_cookie'
    },
    production: {}
};

module.exports = config[env];