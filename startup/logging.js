const winston = require('winston');

require('express-async-errors');

module.exports = function () {
    let date = new Date().toISOString();
    const logFormat = winston.format.printf(function (info) {
        return `${date}-${info.level}: ${JSON.stringify(info, null, 4)}\n`;
    });

    winston.loggers.add('logger', {
        level: process.env.LOG_LEVEL || 'info',
        defaultMeta: {
            service: 'vidly app...',
        },
        format: winston.format.logstash(),
        transports: [
            new winston.transports.File({
                filename: 'logfile.log',
            }),
            new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), logFormat)
            })
        ]
    });

    process.on('uncaughtException', (ex) => {
        //console.log('EXCEPTION: uncausght excpetion');
        winston.loggers.get('logger').error(ex.message, ex);
        //console.log(ex);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('EXCEPTION: unhandled rejection of a promise ');
        winston.loggers.get('logger').error(ex.message, ex);
        console.log(ex);
        process.exit(1);
    });
}