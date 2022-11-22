import { inject, injectable } from 'inversify';
import { DIDomain } from '../../Shared/dependency-injection';
import { ContactRepository } from '../domain/ContactRepository';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { ContactId } from '../domain/value-object/ContactId';
import { PhonePrefix } from '../../Shared/domain/Phone/PhonePrefix';
import { PhoneNumber } from '../../Shared/domain/Phone/PhoneNumber';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { ContactLastName } from '../domain/value-object/ContactLastName';
import { ContactName } from '../domain/value-object/ContactName';
import { Contact } from '../domain/Contact';
import { InconsistentContactError } from '../domain/exceptions/InconsistentContactError';

export type Params = {
  accountId: string;
  id: string;
  name: string;
  lastName: string;
  prefix?: string;
  number: string;
};

@injectable()
export class SaveContactUseCase {
  constructor(
    @inject(DIDomain.contact) private repository: ContactRepository
  ) {}

  async run(params: Params) {
    const accountId = new AccountId(params.accountId);
    const id = new ContactId(params.id);
    const name = new ContactName(params.name);
    const lastName = new ContactLastName(params.lastName);
    const phone = new Phone(
      new PhonePrefix(params.prefix),
      new PhoneNumber(params.number)
    );

    let contact = await this.repository.findByPhone(accountId, phone);

    if (contact) {
      if (contact.id.value !== id.value) {
        throw new InconsistentContactError(contact);
      }

      contact.change(name, lastName);
    } else {
      contact = Contact.create(accountId, id, name, lastName, phone);
    }
    this.repository.save(contact);
  }
}
