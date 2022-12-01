import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from 'inversify';
import { FindAccountUseCase } from '../../../core/Account/application/FindAccount';
import { Account } from '../../../core/Account/domain/Account';
import { AccountNotFoundError } from '../../../core/Account/domain/exceptions/AccountNotFoundError';
import { Controller } from '../Controller';

type ControllerResponse = {
  id: string;
  companyName: string;
  vat: string;
  address: {
    street: string;
    addressNumber: string;
    postalCode: string;
    region: string;
    country: string;
  };
  metaAccount: {
    id: string;
  };
};

@injectable()
export class AccountGetController implements Controller {
  constructor(
    @inject(FindAccountUseCase)
    private findAccountUseCase: FindAccountUseCase
  ) {}

  async run(req: Request, res: Response) {
    const id = process.env.ACCOUNT_ID || '';

    try {
      const account = await this.findAccountUseCase.run(id);

      const response = this.mapToControllerResponse(account);

      res.status(httpStatus.OK).send(response);
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        res.status(httpStatus.NOT_FOUND).send({ message: err.message });
      } else {
        throw err;
      }
    }
  }

  private mapToControllerResponse(account: Account): ControllerResponse {
    return {
      id: account.id.value,
      companyName: account.companyName.value,
      vat: account.vat.value,
      address: {
        street: account.address.street.value,
        addressNumber: account.address.addressNumber.value,
        postalCode: account.address.postalCode.value,
        region: account.address.region.value,
        country: account.address.country.value,
      },
      metaAccount: {
        id: account.metaAccount.id.value,
      },
    };
  }
}
