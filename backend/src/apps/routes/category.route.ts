import { Router, Request, Response } from 'express';
import { Controller } from '../controllers/Controller';
import {
  container,
  DiController,
} from '../../core/Shared/dependency-injection';

import { body, param } from 'express-validator';
import { validateReqSchema } from '.';

const putPostSchema = [
  param('id').exists().isString(),
  body('name').exists().isString(),
  body('description').optional().isString(),
  body('templates').optional().isArray(),
];
const getSchema = [param('id').exists().isString()];

const categoryPutController = container.get<Controller>(
  DiController.categoryPut
);

const searchAllCategoriesController = container.get<Controller>(
  DiController.searchAllCategories
);
const categoryGetController = container.get<Controller>(
  DiController.categoryGet
);

export const register = (router: Router) => {
  router.put(
    '/category/:id',
    putPostSchema,
    validateReqSchema,
    async (req: Request, res: Response) => categoryPutController.run(req, res)
  );

  router.get('/category', (req: Request, res: Response) =>
    searchAllCategoriesController.run(req, res)
  );

  router.get(
    '/category/:id',
    getSchema,
    validateReqSchema,
    (req: Request, res: Response) => categoryGetController.run(req, res)
  );
};
