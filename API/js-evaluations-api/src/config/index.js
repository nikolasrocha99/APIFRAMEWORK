// This file contains configuration settings for the application, such as environment variables and database connection details.

const dotenv = require('dotenv');

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'appuser',
        password: process.env.DB_PASS || 'apppass',
        database: process.env.DB_NAME || 'appdb',
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
};

module.exports = config;