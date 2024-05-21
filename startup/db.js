const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    const db = config.get('db');
    mongoose.connect(db)
        .then(() => {
            console.log(`Connected to MongoDB ..${db}...........`);
            winston.loggers.get('logger').info(`Connected to MongoDB..${db}.`);
        });
}