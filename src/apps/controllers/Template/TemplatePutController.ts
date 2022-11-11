import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import {
  SaveTemplateUseCase,
  Params,
} from '../../../core/Template/application/SaveTemplate';
import { inject, injectable } from 'inversify';
import { DomainError } from '../../../core/Shared/domain/DomainError';
import { DIDomain } from '../../../core/Shared/dependency-injection';
import Logger from '../../../core/Shared/domain/Logger';

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(SaveTemplateUseCase)
    private saveTemplateUseCase: SaveTemplateUseCase,
    @inject(DIDomain.logger) private logger: Logger
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
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

      await this.saveTemplateUseCase.run(useCaseParams);
      res.sendStatus(httpStatus.CREATED);
    } catch (err) {
      if (err instanceof DomainError) {
        this.logger.error(err);
        res.status(httpStatus.BAD_REQUEST).json(err.message);
      } else {
        throw err;
      }
    }
  }
}
