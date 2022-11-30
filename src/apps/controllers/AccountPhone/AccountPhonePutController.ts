import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { inject, injectable } from 'inversify';
import { DomainError } from '../../../core/Shared/domain/DomainError';
import { DiDomain } from '../../../core/Shared/dependency-injection';
import Logger from '../../../core/Shared/domain/Logger';
import { SaveAccountPhoneUseCase } from '../../../core/AccountPhone/application/SaveAccountPhone';

@injectable()
export class AccountPhonePutController implements Controller {
  constructor(
    @inject(SaveAccountPhoneUseCase)
    private saveAccountPhoneUseCase: SaveAccountPhoneUseCase,
    @inject(DiDomain.logger) private logger: Logger
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const useCaseParams = {
        accountId: process.env.ACCOUNT_ID || '',
        id: req.params.id,
        prefix: req.body.prefix,
        number: req.body.number,
      };

      await this.saveAccountPhoneUseCase.run(useCaseParams);
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
