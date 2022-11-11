// import { Request, Response } from 'express';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from 'inversify';
import { SaveCategoryUseCase } from '../../../core/Category/application/SaveCategory';

import { Controller } from '../Controller';

@injectable()
export class CategoryPutController implements Controller {
  constructor(
    @inject(SaveCategoryUseCase)
    private saveCategoryUseCase: SaveCategoryUseCase
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const useCaseParams = {
      accountId: process.env.ACCOUNT_ID || '',
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      templateIds: req.body.templates.map((templateId: unknown) => templateId),
    };

    this.saveCategoryUseCase.run(useCaseParams);

    await this.saveCategoryUseCase.run(useCaseParams);
    res.status(httpStatus.OK).send();
    // } catch (e) {
    //   if (e instanceof Error) {
    //     res.status(httpStatus.BAD_REQUEST).json(e.message);
    //   }
    //   res.status(httpStatus.INTERNAL_SERVER_ERROR);
    // }
  }
}
