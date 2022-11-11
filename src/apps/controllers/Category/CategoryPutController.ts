// import { Request, Response } from 'express';
import { inject } from 'inversify';
import { SaveCategoryUseCase } from '../../../core/Category/application/SaveCategory';

import { Controller } from '../Controller';

export class CategoryPutController implements Controller {
  constructor(
    @inject(SaveCategoryUseCase)
    private saveCategoryUseCase: SaveCategoryUseCase
  ) {}

  run(): Promise<void> {
    // con;

    // this.saveCategoryUseCase.run();
    throw new Error('Method not implemented.');
  }
}
