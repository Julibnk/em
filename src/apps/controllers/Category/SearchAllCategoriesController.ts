import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../Controller';
import { SearchAllCategoriesUseCase } from '../../../core/Category/application/SearchAllCategories';
import { SearchAllTemplatesUseCase } from '../../../core/Template/application/SearchAllTemplates';
import { Category } from '../../../core/Category/domain/Category';
import { Template } from '../../../core/Template/domain/Template';
import httpStatus from 'http-status';

type ControllerResponse = Array<{
  id: string;
  name: string;
  description: string;
  templates: Array<{
    id: string;
    name: string;
    shortDescription: string;
    preview: string;
    variable1: string;
    variable2: string;
    variable3: string;
    status: string;
  }>;
}>;

@injectable()
export class SearchAllCategoriesController implements Controller {
  constructor(
    @inject(SearchAllCategoriesUseCase)
    private searchAllCategoriesUseCase: SearchAllCategoriesUseCase,
    @inject(SearchAllTemplatesUseCase)
    private searchAllTemplatesUseCase: SearchAllTemplatesUseCase
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const accountId = (req.params.accountId = process.env.ACCOUNT_ID || '');
      const categories = await this.searchAllCategoriesUseCase.run(accountId);
      const templates = await this.searchAllTemplatesUseCase.run(accountId);
      const response = this.mapResponse(categories, templates);
      res.json(response);
    } catch (e) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapResponse(
    categories: Array<Category>,
    templates: Array<Template>
  ): ControllerResponse {
    const templatesPrimitives = templates.map((template) => {
      const { accountId, ...templatePrimitives } = template.toPrimitives();
      return templatePrimitives;
    });

    return categories.map((category) => {
      const { accountId, templateIds, ...categoryPrimitives } =
        category.toPrimitives();

      const templates = templatesPrimitives.filter((template) =>
        templateIds.includes(template.id)
      );

      return { ...categoryPrimitives, templates: [...templates] };
    });
  }
}
