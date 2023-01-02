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
  body('number').exists().isString(),
  body('prefix').exists().isString(),
];
const getSchema = [param('id').exists().isString()];

const accountPhonePutController = container.get<Controller>(
  DiController.accountPhonePut
);

const accountPhoneGetController = container.get<Controller>(
  DiController.accountPhoneGet
);

export const register = (router: Router) => {
  router.put(
    '/accountPhone/:id',
    putPostSchema,
    validateReqSchema,
    async (req: Request, res: Response) =>
      accountPhonePutController.run(req, res)
  );

  router.get(
    '/accountPhone/:id',
    getSchema,
    validateReqSchema,
    (req: Request, res: Response) => accountPhoneGetController.run(req, res)
  );
};
