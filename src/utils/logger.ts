import log4js from 'log4js';
log4js.configure('./log4js.config.json');
const logger = log4js.getLogger('server');
export default logger;
