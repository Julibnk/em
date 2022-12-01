import Logger from '../../../core/Shared/domain/Logger';

import { inject, injectable } from 'inversify';
import {
  Params,
  SaveAccountUseCase,
} from '../../../core/Account/application/SaveAccount';
import { DiDomain } from '../../../core/Shared/dependency-injection';
import { Controller } from '../Controller';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { DomainError } from '../../../core/Shared/domain/DomainError';

@injectable()
export class AccountPutController implements Controller {
  constructor(
    @inject(SaveAccountUseCase)
    private saveAccountUseCase: SaveAccountUseCase,
    @inject(DiDomain.logger) private logger: Logger
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const useCaseParams: Params = {
        id: process.env.ACCOUNT_ID || '',
        companyName: req.body.companyName,
        vat: req.body.vat,
        address: {
          street: req.body.address.street,
          addressNumber: req.body.address.addressNumber,
          postalCode: req.body.address.postalCode,
        },
        metaAccount: {
          id: req.body.metaAccount.id,
        },
      };

      await this.saveAccountUseCase.run(useCaseParams);
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
