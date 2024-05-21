const winston = require('winston');

module.exports = function (err, req, res, next) {
    //winston.log('error', err.message)
    //winston.error(err.message, err);

    winston.loggers.get('logger').error(err.message, err);


    res.status(500).send('Something failed.');
}