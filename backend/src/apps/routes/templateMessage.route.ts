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
  body('status').exists().isString(),
  body('templateId').exists().isString(),
  body('accountPhoneId').exists().isString(),
  body('contactId').exists().isString(),
  body('parameter1').optional().isString(),
  body('parameter2').optional().isString(),
  body('parameter3').optional().isString(),
  body('scheduleDate').optional().isISO8601(),
];

const getSchema = [param('id').exists().isString()];

export const register = (router: Router) => {
  const templateMessagePutController = container.get<Controller>(
    DiController.templateMessagePut
  );

  const templateMessageGetController = container.get<Controller>(
    DiController.templateMessageGet
  );

  const templateMessagePostController = container.get<Controller>(
    DiController.templateMessagePost
  );

  router.put(
    '/templateMessage/:id',
    putPostSchema,
    validateReqSchema,
    (req: Request, res: Response) => templateMessagePutController.run(req, res)
  );

  router.get(
    '/templateMessage/:id',
    getSchema,
    validateReqSchema,
    (req: Request, res: Response) => templateMessageGetController.run(req, res)
  );

  router.post(
    '/templateMessage',
    // getSchema,
    // validateReqSchema,
    (req: Request, res: Response) => templateMessagePostController.run(req, res)
  );
};
