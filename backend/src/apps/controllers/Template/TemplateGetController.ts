import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { FindTemplateUseCase } from '../../../core/Template/application/FindTemplate';
import { Controller } from '../Controller';
import httpStatus from 'http-status';
import { TemplateNotFoundError } from '../../../core/Template/domain/exceptions/TemplateNotFoundError';

type ControllerResponse = {
  id: string;
  name: string;
  shortDescription: string;
  preview: string;
  variable1: string;
  variable2: string;
  variable3: string;
  status: string;
};

@injectable()
export class TemplateGetController implements Controller {
  constructor(
    @inject(FindTemplateUseCase)
    private findTemplateUseCase: FindTemplateUseCase
  ) {}

  async run(req: Request, res: Response) {
    const accountId = process.env.ACCOUNT_ID || '';
    const templateId = req.params.id;

    try {
      const template = await this.findTemplateUseCase.run(
        accountId,
        templateId
      );

      const response: ControllerResponse = {
        id: template.id.value,
        name: template.name.value,
        shortDescription: template.shortDescription.value,
        preview: template.preview.value,
        variable1: template.variable1.value,
        variable2: template.variable2.value,
        variable3: template.variable3.value,
        status: template.status.value,
      };

      res.status(httpStatus.OK).send(response);
    } catch (err) {
      if (err instanceof TemplateNotFoundError) {
        res.status(httpStatus.NOT_FOUND).send({ message: err.message });
      } else {
        throw err;
      }
    }
  }
}
