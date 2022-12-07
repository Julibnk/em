import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../Controller';
import { FindCategoryUseCase } from '../../../core/Category/application/FindCategory';
import { CategoryNotFoundError } from '../../../core/Category/domain/exceptions/CategoryNotFoundError';
import httpStatus from 'http-status';
import { SearchAllTemplatesUseCase } from '../../../core/Template/application/SearchAllTemplates';
import { Category } from '../../../core/Category/domain/Category';
import { Template } from '../../../core/Template/domain/Template';

type ControllerResponse = {
  id: string;
  name: string;
  descriptiton: string;
  templates: Array<{
    id: string;
    name: string;
    description: string;
    preview: string;
    variable1: string;
    variable2: string;
    variable3: string;
    status: string;
  }>;
};

@injectable()
export class CategoryGetController implements Controller {
  constructor(
    @inject(SearchAllTemplatesUseCase)
    private searchAllTemplatesUseCase: SearchAllTemplatesUseCase,
    @inject(FindCategoryUseCase)
    private findCategoryUseCase: FindCategoryUseCase
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const accountId = process.env.ACCOUNT_ID || '';
    const categoryId = req.params.id;
    try {
      const category = await this.findCategoryUseCase.run(
        accountId,
        categoryId
      );
      const allTemplates = await this.searchAllTemplatesUseCase.run(accountId);
      const response = this.mapResponse(category, allTemplates);
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      if (err instanceof CategoryNotFoundError)
        res.status(httpStatus.NOT_FOUND).send({ message: err.message });
      else {
        throw err;
      }
    }
  }

  private mapResponse(
    category: Category,
    templates: Array<Template>
  ): ControllerResponse {
    const categoryTemplates = templates.filter((template) => {
      return category.templateIds.find((id) => id.value === template.id.value);
    });

    return {
      id: category.id.value,
      name: category.name.value,
      descriptiton: category.description.value,
      templates: categoryTemplates.map((template) => ({
        id: template.id.value,
        name: template.name.value,
        description: template.description.value,
        preview: template.preview.value,
        variable1: template.variable1.value,
        variable2: template.variable2.value,
        variable3: template.variable3.value,
        status: template.status.value,
      })),
    };
  }
}
