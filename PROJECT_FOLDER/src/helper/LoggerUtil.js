const winston = require('winston')

const logFormat = winston.format.combine(
    winston.format.label({ label: '[my-label]' }),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level.substr(0, 3)} - ${info.message}`)
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: logFormat,
    transports: []
});

const initTransport = () => {
    logger.add(new winston.transports.Console({ format: logFormat }))
};

initTransport();

class LoggerUtil {
    info(message) {
        logger.info(message)
    }
    error(message, error) {
        logger.error(`${message} - ${error.stack}`)
    }
}

module.exports = new LoggerUtil()
