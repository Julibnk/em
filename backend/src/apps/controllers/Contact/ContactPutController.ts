import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { inject, injectable } from 'inversify';
import { DomainError } from '../../../core/Shared/domain/DomainError';
import { DiDomain } from '../../../core/Shared/dependency-injection';
import Logger from '../../../core/Shared/domain/Logger';
import {
  SaveContactUseCase,
  Params,
} from '../../../core/Contact/application/SaveContact';

@injectable()
export class ContactPutController implements Controller {
  constructor(
    @inject(SaveContactUseCase)
    private saveContactUseCase: SaveContactUseCase,
    @inject(DiDomain.logger) private logger: Logger
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const useCaseParams: Params = {
        accountId: process.env.ACCOUNT_ID || '',
        id: req.params.id,
        name: req.body.name,
        lastName: req.body.lastName || '',
        phone: {
          prefix: req.body.phone.prefix || '',
          number: req.body.phone.number,
        },
      };

      await this.saveContactUseCase.run(useCaseParams);
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
