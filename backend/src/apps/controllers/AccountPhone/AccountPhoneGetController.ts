import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { Controller } from '../Controller';
import httpStatus from 'http-status';

import { FindAccountPhoneUseCase } from '../../../core/AccountPhone/application/FindAccountPhone';
import { AccountPhoneNotFoundError } from '../../../core/AccountPhone/domain/exceptions/AccountPhoneNotFoundError';

type ControllerResponse = {
  id: string;
  prefix: string;
  number: string;
};

@injectable()
export class AccountPhoneGetController implements Controller {
  constructor(
    @inject(FindAccountPhoneUseCase)
    private findAccountPhoneUseCase: FindAccountPhoneUseCase
  ) {}

  async run(req: Request, res: Response) {
    const accountId = process.env.ACCOUNT_ID || '';
    const accountPhoneId = req.params.id;

    try {
      const accountPhone = await this.findAccountPhoneUseCase.run(
        accountId,
        accountPhoneId
      );

      const response: ControllerResponse = {
        id: accountPhone.id.value,
        prefix: accountPhone.phone.prefix.value,
        number: accountPhone.phone.number.value,
      };

      res.status(httpStatus.OK).send(response);
    } catch (err) {
      if (err instanceof AccountPhoneNotFoundError) {
        res.status(httpStatus.NOT_FOUND).send({ message: err.message });
      } else {
        throw err;
      }
    }
  }
}
