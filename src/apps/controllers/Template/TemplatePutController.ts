import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { TemplateCreator } from '../../../core/template/application/TemplateCreator';
import { inject } from 'inversify';

type TemplatePutRequest = Request & {
  body: {
    id: string;
    name: string;
  };
};
export class TemplatePutController implements Controller {
  constructor(private templateCreator: TemplateCreator) {}

  async run(req: TemplatePutRequest, res: Response) {
    try {
      const { id, name } = req.body;
      await this.templateCreator.run({ id, name });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
