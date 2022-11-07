import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { TemplateCreator } from '../../../core/Template/application/TemplateCreator';
import { inject, injectable } from 'inversify';

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(TemplateCreator)
    private templateCreator: TemplateCreator
  ) {}

  async run(req: Request, res: Response) {
    const useCaseParams = {
      accountId: req.params.accountId,
      id: req.params.id,
      name: req.body.name,
      shortDescription: req.body.shortDescription,
      preview: req.body.preview,
      variable1: req.body.variable1,
      variable2: req.body.variable2,
      variable3: req.body.variable3,
    };

    await this.templateCreator.run(useCaseParams);
    res.status(httpStatus.CREATED).send();
  }
}
