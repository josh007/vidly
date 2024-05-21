const winston = require('winston');
const express = require('express');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

//throw new Error('OPPPPPS...............');
// const p = Promise.reject(new Error('Something failed miserably!'));

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}.....`);
    winston.loggers.get('logger').info(`Listening on port ${port}.....`);
});

module.exports = server;