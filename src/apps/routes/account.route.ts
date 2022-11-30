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
  body('companyName').exists().isString(),
  body('vat').exists().isString(),
  body('address').exists().isObject(),
  body('address.street').exists().isString(),
  body('address.addressNumber').exists().isString(),
  body('address.postalCode').exists().isString(),
  body('metaAccount').exists().isObject(),
  body('metaAccount.id').exists().isString(),
];

const getSchema = [param('id').exists().isString()];

const accountPutController = container.get<Controller>(DiController.accountPut);
const accountGetController = container.get<Controller>(DiController.accountGet);

export const register = (router: Router) => {
  router.put(
    '/account/:id',
    putPostSchema,
    validateReqSchema,
    async (req: Request, res: Response) => accountPutController.run(req, res)
  );

  router.get(
    '/account/:id',
    getSchema,
    validateReqSchema,
    (req: Request, res: Response) => accountGetController.run(req, res)
  );
};
