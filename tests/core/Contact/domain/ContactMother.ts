import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Contact } from '../../../../src/core/Contact/domain/Contact';
import { ContactId } from '../../../../src/core/Contact/domain/value-object/ContactId';
import { ContactLastName } from '../../../../src/core/Contact/domain/value-object/ContactLastName';
import { ContactName } from '../../../../src/core/Contact/domain/value-object/ContactName';
import { Phone } from '../../../../src/core/Shared/domain/Phone/Phone';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { PhoneMother } from '../../Shared/domain/Phone/PhoneMother';
import { ContactIdMother } from './ContactIdMother';
import { ContactLastNameMother } from './ContactLastNameMother';
import { ContactNameMother } from './ContactNameMother';
export class ContactMother {
  static create(
    accountId: AccountId,
    id: ContactId,
    name: ContactName,
    lastName: ContactLastName,
    phone: Phone
  ): Contact {
    return new Contact(accountId, id, name, lastName, phone);
  }

  static random(): Contact {
    return this.create(
      AccountIdMother.random(),
      ContactIdMother.random(),
      ContactNameMother.random(),
      ContactLastNameMother.random(),
      PhoneMother.random()
    );
  }

  static withAccount(accountId: AccountId): Contact {
    return this.create(
      accountId,
      ContactIdMother.random(),
      ContactNameMother.random(),
      ContactLastNameMother.random(),
      PhoneMother.random()
    );
  }
}
