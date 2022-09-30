import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { TemplateCreator } from '../../../core/template/application/TemplateCreator';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../../core/Shared/dependency-injection/namespaces';
import { Primitives } from '../../../core/Shared/domain/common/Primitives';
import { Template } from '../../../core/template/domain/Template';

// type TemplatePutRequest = Request & {
//   body: <Primitives<Template>>;
// };

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(DI_NAMESPACES.TEMPLATE_CREATOR)
    private templateCreator: TemplateCreator
  ) {}

  async run(req: Request, res: Response) {
    try {
      await this.templateCreator.run(req.body);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(message);
    }
  }
}
