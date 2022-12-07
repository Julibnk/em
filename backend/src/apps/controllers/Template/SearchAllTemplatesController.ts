import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { inject, injectable } from 'inversify';
import { SearchAllTemplatesUseCase } from '../../../core/Template/application/SearchAllTemplates';
import { Template } from '../../../core/Template/domain/Template';

type ControllerResponse = Array<{
  id: string;
  name: string;
  description: string;
  preview: string;
  variable1: string;
  variable2: string;
  variable3: string;
  status: string;
}>;

@injectable()
export class SearchAllTemplatesController implements Controller {
  constructor(
    @inject(SearchAllTemplatesUseCase)
    private searchAllTemplatesUseCase: SearchAllTemplatesUseCase
  ) {}

  async run(req: Request, res: Response) {
    req.params.accountId = process.env.ACCOUNT_ID || '';

    const templates = await this.searchAllTemplatesUseCase.run(
      req.params.accountId
    );

    const response = this.mapResponse(templates);

    res.send(response);
  }

  private mapResponse(templates: Array<Template>): ControllerResponse {
    return templates.map((template) => {
      const { accountId, ...templatePrimitives } = template.toPrimitives();
      return templatePrimitives;
    });
  }
}
