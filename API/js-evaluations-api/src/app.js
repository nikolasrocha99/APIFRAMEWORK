const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes setup
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;