// import { Request, Response } from 'express';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from 'inversify';
import {
  SaveCategoryUseCase,
  Params as UseCaseParams,
} from '../../../core/Category/application/SaveCategory';
import { Controller } from '../Controller';
import { DIDomain } from '../../../core/Shared/dependency-injection';
import Logger from '../../../core/Shared/domain/Logger';
import { DomainError } from '../../../core/Shared/domain/DomainError';

@injectable()
export class CategoryPutController implements Controller {
  constructor(
    @inject(SaveCategoryUseCase)
    private saveCategoryUseCase: SaveCategoryUseCase,
    @inject(DIDomain.logger) private logger: Logger
  ) {}

  async run(req: Request, res: Response) {
    try {
      const templateIds = req.body.templates?.map((id: string) => id) || [];
      const useCaseParams: UseCaseParams = {
        accountId: process.env.ACCOUNT_ID || '',
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        templateIds,
      };

      await this.saveCategoryUseCase.run(useCaseParams);
      res.status(httpStatus.CREATED).send();
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
