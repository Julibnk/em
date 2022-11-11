import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import {
  SaveTemplateUseCase,
  Params,
} from '../../../core/Template/application/SaveTemplate';
import { inject, injectable } from 'inversify';

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
      res.status(httpStatus.OK).send();
    } catch (e) {
      if (e instanceof Error) {
        res.status(httpStatus.BAD_REQUEST).json(e.message);
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
