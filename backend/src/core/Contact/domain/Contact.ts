import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Primitives } from '../../Shared/domain/Primitives';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { ContactId } from './value-object/ContactId';
import { ContactName } from './value-object/ContactName';
import { ContactLastName } from './value-object/ContactLastName';
import { AccountId } from '../../Account/domain/value-object/AccountId';

type PhonePrimitives = Primitives<Phone>;
type ContactPrimitives = Omit<Primitives<Contact>, 'phone'> & {
  phone: PhonePrimitives;
};

export class Contact extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: ContactId,
    private _name: ContactName,
    private _lastName: ContactLastName,
    readonly phone: Phone
  ) {
    super();
  }

  public get name(): ContactName {
    return this._name;
  }
  public get lastName(): ContactLastName {
    return this._lastName;
  }

  change(name: ContactName, surname: ContactLastName): void {
    this._name = name;
    this._lastName = surname;
  }

  static fromPrimitives(plainData: ContactPrimitives): Contact {
    return new Contact(
      new AccountId(plainData.accountId),
      new ContactId(plainData.id),
      new ContactName(plainData.name),
      new ContactLastName(plainData.lastName),
      Phone.fromPrimitives(plainData.phone.prefix, plainData.phone.number)
    );
  }

  static create(
    accountId: AccountId,
    id: ContactId,
    name: ContactName,
    lastName: ContactLastName,
    phone: Phone
  ): Contact {
    return new Contact(accountId, id, name, lastName, phone);
  }

  toPrimitives(): ContactPrimitives {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      name: this.name.value,
      lastName: this.lastName.value,
      phone: {
        prefix: this.phone.prefix.value,
        number: this.phone.number.value,
      },
    };
  }
}
