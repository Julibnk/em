import { inject, injectable } from 'inversify';
import { Controller } from '../Controller';
// import {
//   SaveTemplateMessageUseCase,
//   Params,
// } from '../../../core/TemplateMessage/application/SaveTemplateMessage';
import { DiDomain } from '../../../core/Shared/dependency-injection';
import Logger from '../../../core/Shared/domain/Logger';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { DomainError } from '../../../core/Shared/domain/DomainError';
import {
  SearchTemplateMessageUseCase,
  Params,
} from '../../../core/TemplateMessage/application/SearchTemplateMessage';
import { Nullable } from '../../../core/Shared/domain/Nullable';

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
}[];

@injectable()
export class TemplateMessagePostController implements Controller {
  constructor(
    @inject(SearchTemplateMessageUseCase)
    private searchTemplateMessageUseCase: SearchTemplateMessageUseCase,
    @inject(DiDomain.logger) private logger: Logger
  ) {}

  async run(_: Request, res: Response): Promise<void> {
    try {
      const useCaseParams: Params = {
        accountId: process.env.ACCOUNT_ID || '',
      };

      const messages = await this.searchTemplateMessageUseCase.run(
        useCaseParams
      );

      const reponse: ControllerResponse = messages.map((message) => ({
        id: message.id.value,
        status: message.status.value,
        templateId: message.templateId.value,
        accountPhoneId: message.accountPhoneId.value,
        contactId: message.contactId.value,
        parameter1: message.parameter1.value,
        parameter2: message.parameter2.value,
        parameter3: message.parameter3.value,
        scheduleDate: message.scheduleDate?.value,
        sentDate: message.sentDate?.value,
      }));

      res.status(httpStatus.OK).send(reponse);
    } catch (err) {
      if (err instanceof DomainError) {
        this.logger.error(err);
        res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
      } else {
        throw err;
      }
    }
  }
}
