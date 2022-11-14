import { Router, Request, Response } from 'express';
import { Controller } from '../controllers/Controller';
import {
  container,
  DIController,
} from '../../core/Shared/dependency-injection';

import { body, param } from 'express-validator';
import { validateReqSchema } from '.';

const putPostSchema = [
  param('id').exists().isString(),
  body('name').exists().isString(),
  body('shortDescription').exists().isString(),
  body('preview').optional().isString(),
  body('variable1').optional().isString(),
  body('variable2').optional().isString(),
  body('variable3').optional().isString(),
];

const getSchema = [param('id').exists().isString()];

export const register = (router: Router) => {
  const templatePutController = container.get<Controller>(
    DIController.templatePut
  );

  const templateSeachAllController = container.get<Controller>(
    DIController.searchAllTemplates
  );
  const templateGetController = container.get<Controller>(
    DIController.templateGet
  );

  router.put(
    '/template/:id',
    putPostSchema,
    validateReqSchema,
    (req: Request, res: Response) => templatePutController.run(req, res)
  );

  router.get('/template', (req: Request, res: Response) =>
    templateSeachAllController.run(req, res)
  );

  router.get(
    '/template/:id',
    getSchema,
    validateReqSchema,
    (req: Request, res: Response) => templateGetController.run(req, res)
  );
};
