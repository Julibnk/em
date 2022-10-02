import { Router, Request, Response } from 'express';
import { Controller } from '../controllers/Controller';
import { container } from '../../core/Shared/dependency-injection';
import { DI_NAMESPACES } from '../../core/Shared/dependency-injection/namespaces';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

const putSchema = [
  body('id').exists().isString(),
  body('name').exists().isString(),
  body('shortDescription').exists().isString(),
  body('preview').optional().isString(),
  body('variable1').optional().isString(),
  body('variable2').optional().isString(),
  body('variable3').optional().isString(),
];

export const register = (router: Router) => {
  const templatePutController = container.get<Controller>(
    DI_NAMESPACES.TEMPLATE_PUT_CONTROLLER
  );

  router.put(
    '/template',
    putSchema,
    validateReqSchema,
    (req: Request, res: Response) => templatePutController.run(req, res)
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
