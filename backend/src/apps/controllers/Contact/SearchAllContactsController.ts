import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { inject, injectable } from 'inversify';
import { SearchAllContactsUseCase } from '../../../core/Contact/application/SearchAllContacts';
import { Contact } from '../../../core/Contact/domain/Contact';

type ControllerResponse = Array<{
  id: string;
  name: string;
  lastName: string;
  phone: {
    number: string;
    prefix: string;
  };
}>;

@injectable()
export class SearchAllContactsController implements Controller {
  constructor(
    @inject(SearchAllContactsUseCase)
    private searchAllContactsUseCase: SearchAllContactsUseCase
  ) {}

  async run(req: Request, res: Response) {
    req.params.accountId = process.env.ACCOUNT_ID || '';

    const contacts = await this.searchAllContactsUseCase.run(
      req.params.accountId
    );

    const response = this.mapResponse(contacts);

    res.send(response);
  }

  private mapResponse(contacts: Array<Contact>): ControllerResponse {
    return contacts.map((contact) => {
      const { accountId, ...contactPrimitives } = contact.toPrimitives(); // eslint-disable-line @typescript-eslint/no-unused-vars
      return contactPrimitives;
    });
  }
}
