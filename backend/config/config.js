require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        server: {
            port: process.env.PORT || 3000,
            hostname: process.env.HOSTNAME || 'localhost',
        },
        database: {
            url: process.env.DB_DEV,
        },
        environment: process.env.NODE_ENV
    },

    test: {
        server: {
            port: process.env.PORT || 3100,
            hostname: process.env.HOSTNAME || 'localhost',
        },
        database: {
            url: process.env.DB_TEST,
        },
        environment: process.env.NODE_ENV
    },

    production: {
        server: {
            port: process.env.PORT || 3200,
            hostname: process.env.HOSTNAME || 'localhost',
        },
        database: {
            url: process.env.DB_PROD,
        },
        environment: process.env.NODE_ENV
    },
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'test';
config[env].isProd = env === 'production';

module.exports = config[env];