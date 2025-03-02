const LoggerUtil = require('../helper/LoggerUtil');

const InfoFilter = (req, res, next) => {
    LoggerUtil.info(`hostname: ${req.hostname}, ip: ${req.ip}`);
    LoggerUtil.info(`${req.method} ${req.url}`);
    if (JSON.stringify(req.query) != "{}") {
        LoggerUtil.info(`query param: ${JSON.stringify(req.query)}`);
    }
    if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
        const bd = req.body;
        LoggerUtil.info(`body param: ${JSON.stringify(bd)}`);
    }
    next()
}

module.exports = { InfoFilter }