import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { inject, injectable } from 'inversify';
import { SearchAllTemplates } from '../../../core/Template/application/SearchAllTemplates';

@injectable()
export class SearchAllTemplatesController implements Controller {
  constructor(
    @inject(SearchAllTemplates)
    private searchAllTemplatesUseCase: SearchAllTemplates
  ) {}

  async run(req: Request, res: Response) {
    req.params.accountId = process.env.ACCOUNT_ID || '';

    const templates = await this.searchAllTemplatesUseCase.run(
      req.params.accountId
    );

    res.send(
      templates.map((template) => {
        const { accountId, ...templatePrimitives } = template.toPrimitives();
        return templatePrimitives;
      })
    );
  }
}
