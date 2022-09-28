import { Router, Request, Response } from 'express';
import { Controller } from '../controllers/Controller';
import { container } from '../../core/Shared/dependency-injection';
import { DI_NAMESPACES } from '../../core/Shared/dependency-injection/namespaces';

export const register = (router: Router) => {
  const templatePutController = container.get<Controller>(
    DI_NAMESPACES.TEMPLATE_PUT_CONTROLLER
  );

  router.put('/template', (req: Request, res: Response) =>
    templatePutController.run(req, res)
  );
  router.get(
    '/template',
    (req: Request, res: Response) => {
      console.log('get');
      res.send();
    }
    // templatePutController.run(req, res)
  );
};
