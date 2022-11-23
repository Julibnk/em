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
  body('lastName').optional().isString(),
  body('prefix').optional().isString(),
  body('number').exists().isString(),
];

// const getSchema = [param('id').exists().isString()];

export const register = (router: Router) => {
  const contactPutController = container.get<Controller>(
    DiController.contactPut
  );

  const contactSearchAllController = container.get<Controller>(
    DiController.searchAllContacts
  );

  // const templateGetController = container.get<Controller>(
  //   DiController.templateGet
  // );

  router.put(
    '/contact/:id',
    putPostSchema,
    validateReqSchema,
    (req: Request, res: Response) => contactPutController.run(req, res)
  );

  router.get('/contact', (req: Request, res: Response) =>
    contactSearchAllController.run(req, res)
  );

  // router.get(
  //   '/template/:id',
  //   getSchema,
  //   validateReqSchema,
  //   (req: Request, res: Response) => templateGetController.run(req, res)
  // );
};
