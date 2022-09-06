import log4js, { Configuration } from 'log4js';
// import log4js from 'log4js';

const logLevel = process.env.LOGGER_LEVEL || 'OFF';

const loggerConfig: Configuration = {
  appenders: { out: { type: 'stdout' } },
  categories: {
    default: { appenders: ['out'], level: logLevel },
    message: { appenders: ['out'], level: logLevel },
    category: { appenders: ['out'], level: logLevel },
    template: { appenders: ['out'], level: logLevel },
    waba: { appenders: ['out'], level: logLevel },
  },
  //   level: process.env.LOGGER_LEVEL || 'OFF',
};

export default loggerConfig;
