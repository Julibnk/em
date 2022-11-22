import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Primitives } from '../../Shared/domain/Primitives';
import { Phone } from '../../Shared/domain/value-object/Phone';
import { ContactId } from './value-object/ContactId';
import { ContactName } from './value-object/ContactName';
import { ContactSurname } from './value-object/ContactSurname';
import { AccountId } from '../../Account/domain/value-object/AccountId';

type PhonePrimitives = Primitives<Phone>;
type ContactPrimitives = Omit<Primitives<Contact>, 'phone'> & PhonePrimitives;

export class Contact extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: ContactId,
    readonly name: ContactName,
    readonly surname: ContactSurname,
    readonly phone: Phone
  ) {
    super();
  }

  static fromPrimitives(plainData: ContactPrimitives): Contact {
    return new Contact(
      new AccountId(plainData.accountId),
      new ContactId(plainData.id),
      new ContactName(plainData.name),
      new ContactSurname(plainData.surname),
      Phone.fromPrimitives(plainData.prefix, plainData.number)
    );
  }

  toPrimitives(): ContactPrimitives {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      name: this.name.value,
      surname: this.surname.value,
      prefix: this.phone.prefix.value,
      number: this.phone.number.value,
    };
  }
}
