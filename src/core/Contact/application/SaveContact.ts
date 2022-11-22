import { inject, injectable } from 'inversify';
import { DIDomain } from '../../Shared/dependency-injection';
import { ContactRepository } from '../domain/ContactRepository';
// import { Phone } from '../../Shared/domain/value-object/Phone';
// import { PhonePrefix } from '../../Shared/domain/value-object/PhonePrefix';
// import { PhoneNumber } from '../../Shared/domain/value-object/PhoneNumber';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { ContactId } from '../domain/value-object/ContactId';
import { PhonePrefix } from '../../Shared/domain/Phone/PhonePrefix';
import { PhoneNumber } from '../../Shared/domain/Phone/PhoneNumber';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { ContactLastName } from '../domain/value-object/ContactLastName';
import { ContactName } from '../domain/value-object/ContactName';
import { ContactNotFoundError } from '../domain/exceptions/ContactNotFoundError';

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
    // const accountId = new AccountId(params.accountId);
    // const id = new ContactId(params.id);
    // const name = new ContactName(params.name);
    // const lastName = new ContactLastName(params.lastName);
    // const phone = new Phone(
    //   new PhonePrefix(params.prefix),
    //   new PhoneNumber(params.number)
    // );
    // try {
    //   const contact = await this.repository.findByPhone(accountId, phone);
    //   contact.change(name, lastName);
    // } catch (error) {
    //   if (error instanceof ContactNotFoundError) {
    //     const templateWithSameName = await this.repository.searchByName(
    //       accountId,
    //       name
    //     );
    //     if (templateWithSameName) {
    //       throw new TemplateWithSameNameAlreadyExistsError(name);
    //     }
    //     template = Template.create(
    //       accountId,
    //       id,
    //       name,
    //       shortDescription,
    //       preview,
    //       variable1,
    //       variable2,
    //       variable3
    //     );
    //   } else {
    //     throw error;
    //   }
    // }
    // this.repository.save(template);
    // if (contact) {
    //   throw new Error('Contact already exists');
    // }
  }
}
