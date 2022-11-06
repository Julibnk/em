import { Router, Request, Response } from 'express';
import { Controller } from '../controllers/Controller';
import {
  container,
  DIController,
} from '../../core/Shared/dependency-injection';

import { body, param } from 'express-validator';
import { validateReqSchema } from '.';

const putSchema = [
  param('id').exists().isString(),
  body('name').exists().isString(),
  body('shortDescription').exists().isString(),
  body('preview').optional().isString(),
  body('variable1').optional().isString(),
  body('variable2').optional().isString(),
  body('variable3').optional().isString(),
];

export const register = (router: Router) => {
  const templatePutController = container.get<Controller>(
    DIController.templatePut
  );

  router.put(
    '/template/:id',
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
