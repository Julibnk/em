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
  body('description').optional().isString(),
  body('templates').optional().isArray(),
];

export const register = (router: Router) => {
  const categoryPutController = container.get<Controller>(
    DIController.categoryPut
  );

  const searchAllCategoriesController = container.get<Controller>(
    DIController.searchAllCategories
  );

  router.put(
    '/category/:id',
    putPostSchema,
    validateReqSchema,
    async (req: Request, res: Response) => categoryPutController.run(req, res)
  );

  router.get('/category/searchAll', (req: Request, res: Response) =>
    searchAllCategoriesController.run(req, res)
  );
};
