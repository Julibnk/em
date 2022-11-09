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

export const register = (router: Router) => {
  const templatePutController = container.get<Controller>(
    DIController.templatePut
  );
  const templatePostController = container.get<Controller>(
    DIController.templatePost
  );
  const templateSeachAllController = container.get<Controller>(
    DIController.searchAllTemplates
  );

  router.put(
    '/template/:id',
    putPostSchema,
    validateReqSchema,
    (req: Request, res: Response) => templatePutController.run(req, res)
  );

  router.post(
    '/template/:id',
    putPostSchema,
    validateReqSchema,
    (req: Request, res: Response) => templatePostController.run(req, res)
  );

  router.get('/template/searchAll', (req: Request, res: Response) =>
    templateSeachAllController.run(req, res)
  );
};
