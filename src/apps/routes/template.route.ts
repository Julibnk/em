import { Router, Request, Response } from 'express';
import { Controller } from '../controllers/Controller';
import { container } from '../dependency-injection';

export const register = (router: Router) => {
  const templatePutController = container.get<Controller>(
    'template.putController'
  );
  router.put('/template', (req: Request, res: Response) =>
    templatePutController.run(req, res)
  );
};
