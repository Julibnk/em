import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../Controller';
import httpStatus from 'http-status';
import { FindContactUseCase } from '../../../core/Contact/application/FindContact';
import { ContactNotFoundError } from '../../../core/Contact/domain/exceptions/ContactNotFoundError';

type ControllerResponse = {
  id: string;
  name: string;
  lastName: string;
  phone: {
    number: string;
    prefix: string;
  };
};

@injectable()
export class ContactGetController implements Controller {
  constructor(
    @inject(FindContactUseCase)
    private findContactUseCase: FindContactUseCase
  ) {}

  async run(req: Request, res: Response) {
    const accountId = process.env.ACCOUNT_ID || '';
    const contactId = req.params.id;

    try {
      const contact = await this.findContactUseCase.run(accountId, contactId);

      const response: ControllerResponse = {
        id: contact.id.value,
        name: contact.name.value,
        lastName: contact.lastName.value,
        phone: {
          prefix: contact.phone.prefix.value,
          number: contact.phone.number.value,
        },
      };

      res.status(httpStatus.OK).send(response);
    } catch (err) {
      if (err instanceof ContactNotFoundError) {
        res.status(httpStatus.NOT_FOUND).send({ message: err.message });
      } else {
        throw err;
      }
    }
  }
}
