import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { TemplateCreator } from '../../../core/template/application/TemplateCreator';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../../core/Shared/dependency-injection/namespaces';

type TemplatePutRequest = Request & {
  body: {
    id: string;
    name: string;
  };
};

@injectable()
export class TemplatePutController implements Controller {
  constructor(
    @inject(DI_NAMESPACES.TEMPLATE_CREATOR)
    private templateCreator: TemplateCreator
  ) {}

  async run(req: TemplatePutRequest, res: Response) {
    try {
      const { id, name } = req.body;
      await this.templateCreator.run({ id, name });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(message);
    }
  }
}
