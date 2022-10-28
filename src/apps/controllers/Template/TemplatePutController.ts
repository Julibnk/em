import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { TemplateCreator } from '../../../core/Template/application/TemplateCreator';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../../core/Shared/dependency-injection/namespaces';
import { TemplateId } from '../../../core/Template/domain/TemplateId';
import { TemplateName } from '../../../core/Template/domain/TemplateName';
import { TemplateVariable } from '../../../core/Template/domain/TemplateVariable';
import { TemplateShortDescription } from '../../../core/Template/domain/TemplateShortDescription';
import { TemplatePreview } from '../../../core/Template/domain/TemplatePreview';

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(DI_NAMESPACES.TEMPLATE_CREATOR)
    private templateCreator: TemplateCreator
  ) {}

  async run(req: Request, res: Response) {
    const useCaseParams = {
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
