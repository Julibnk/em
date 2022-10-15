import { Request, Response, Router } from 'express';
const { version } = require('../../../package.json');

export const register = (router: Router) => {
  router.get('/health', (_: Request, res: Response) => res.send('OK'));

  router.get('/version', (_: Request, res: Response) => {
    res.send(version);
  });
};
