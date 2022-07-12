// import express from 'express';
// const express  = require('express');
// import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import log4js from 'log4js';
import loggerConfiguration from './src/config/logger';
import router from './src/routes/v1';

const app = express();
const port = process.env.port || 8000;
log4js.configure(loggerConfiguration);
const logger = log4js.getLogger();

app.use('/v1', router);

app.listen(port, () => {
  logger.info(`Running in port ${port}`);
});
