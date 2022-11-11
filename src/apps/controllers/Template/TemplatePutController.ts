import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import {
  SaveTemplateUseCase,
  Params,
} from '../../../core/Template/application/SaveTemplate';
import { inject, injectable } from 'inversify';
import { TemplatePersistenceError } from '../../../core/Template/domain/exceptions/TemplatePersistenceError';

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(SaveTemplateUseCase)
    private saveTemplateUseCase: SaveTemplateUseCase
  ) {}

  async run(req: Request, res: Response) {
    const useCaseParams: Params = {
      accountId: process.env.ACCOUNT_ID || '',
      id: req.params.id,
      name: req.body.name,
      shortDescription: req.body.shortDescription,
      preview: req.body.preview,
      variable1: req.body.variable1,
      variable2: req.body.variable2,
      variable3: req.body.variable3,
    };

    try {
      await this.saveTemplateUseCase.run(useCaseParams);
      res.sendStatus(httpStatus.CREATED);
    } catch (e) {
      if (e instanceof TemplatePersistenceError) {
        res.sendStatus(httpStatus.BAD_REQUEST).json(e.message);
      }
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
