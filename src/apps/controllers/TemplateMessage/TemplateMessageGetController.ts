import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from 'inversify';
import { Nullable } from '../../../core/Shared/domain/Nullable';
import { FindTemplateMessageUseCase } from '../../../core/TemplateMessage/application/FindTemplateMessage';
import { TemplateMessageNotFoundError } from '../../../core/TemplateMessage/domain/exceptions/TemplateMessageNotFoundError';
import { Controller } from '../Controller';

type ControllerResponse = {
  id: string;
  status: string;
  templateId: string;
  accountPhoneId: string;
  contactId: string;
  parameter1: string;
  parameter2: string;
  parameter3: string;
  scheduleDate: Nullable<Date>;
  sentDate: Nullable<Date>;
};

@injectable()
export class TemplateMessageGetController implements Controller {
  constructor(
    @inject(FindTemplateMessageUseCase)
    private findTemplateMessageUseCase: FindTemplateMessageUseCase
  ) {}

  async run(req: Request, res: Response) {
    const accountId = process.env.ACCOUNT_ID || '';
    const messageId = req.params.id;

    try {
      const templateMessage = await this.findTemplateMessageUseCase.run(
        accountId,
        messageId
      );

      const response: ControllerResponse = {
        id: templateMessage.id.value,
        status: templateMessage.status.value,
        templateId: templateMessage.templateId.value,
        accountPhoneId: templateMessage.accountPhoneId.value,
        contactId: templateMessage.contactId.value,
        parameter1: templateMessage.parameter1.value,
        parameter2: templateMessage.parameter2.value,
        parameter3: templateMessage.parameter3.value,
        scheduleDate: templateMessage.scheduleDate?.value,
        sentDate: templateMessage.sentDate?.value,
      };

      res.status(httpStatus.OK).send(response);
    } catch (err) {
      if (err instanceof TemplateMessageNotFoundError) {
        res.status(httpStatus.NOT_FOUND).send({ message: err.message });
      } else {
        throw err;
      }
    }
  }
}
