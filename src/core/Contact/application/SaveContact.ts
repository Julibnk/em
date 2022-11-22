import { inject, injectable } from 'inversify';
import { DIDomain } from '../../Shared/dependency-injection';
import { ContactRepository } from '../domain/ContactRepository';
// import { Phone } from '../../Shared/domain/value-object/Phone';
// import { PhonePrefix } from '../../Shared/domain/value-object/PhonePrefix';
// import { PhoneNumber } from '../../Shared/domain/value-object/PhoneNumber';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { ContactId } from '../domain/value-object/ContactId';

export type Params = {
  accountId: string;
  id: string;
  name: string;
  surname: string;
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
    // const phone = new Phone(
    //   new PhonePrefix(params.prefix),
    //   new PhoneNumber(params.number)
    // );

    const contact = await this.repository.findById(accountId, id);

    if (contact) {
      throw new Error('Contact already exists');
    }
  }
}
