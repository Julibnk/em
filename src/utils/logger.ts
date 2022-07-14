import log4js from 'log4js';
import loggerConfiguration from '../config/logger';

log4js.configure(loggerConfiguration);

export const logger = log4js.getLogger();
