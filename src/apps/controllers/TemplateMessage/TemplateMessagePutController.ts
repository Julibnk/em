import { inject, injectable } from 'inversify';
import { Controller } from '../Controller';
import {
  SaveTemplateMessageUseCase,
  Params,
} from '../../../core/TemplateMessage/application/SaveTemplateMessage';
import { DiDomain } from '../../../core/Shared/dependency-injection';
import Logger from '../../../core/Shared/domain/Logger';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { DomainError } from '../../../core/Shared/domain/DomainError';

@injectable()
export class TemplateMessagePutController implements Controller {
  constructor(
    @inject(SaveTemplateMessageUseCase)
    private saveTemplateMessageUseCase: SaveTemplateMessageUseCase,
    @inject(DiDomain.logger) private logger: Logger
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const useCaseParams: Params = {
        accountId: process.env.ACCOUNT_ID || '',
        id: req.params.id,
        status: req.body.status,
        templateId: req.body.templateId,
        accountPhoneId: req.body.accountPhoneId,
        contactId: req.body.contactId,
        parameter1: req.body.parameter1 || '',
        parameter2: req.body.parameter2 || '',
        parameter3: req.body.parameter3 || '',
        scheduleDate: req.body.scheduleDate,
      };

      await this.saveTemplateMessageUseCase.run(useCaseParams);
      res.sendStatus(httpStatus.CREATED);
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
