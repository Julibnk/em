import { Request, Response, Router } from 'express';

const appRoot = require('app-root-path');
const { version } = require(appRoot + '/package.json'); //eslint-disable-line

export const register = (router: Router) => {
  router.get('/health', (_: Request, res: Response) => res.send('OK'));

  router.get('/version', (_: Request, res: Response) => {
    res.send(version);
  });
};
