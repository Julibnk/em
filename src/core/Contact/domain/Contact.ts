import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Primitives } from '../../Shared/domain/Primitives';
import { Phone } from '../../Shared/domain/Phone/Phone';
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
    private _name: ContactName,
    private _surname: ContactSurname,
    readonly phone: Phone
  ) {
    super();
  }

  public get name(): ContactName {
    return this._name;
  }
  public get surname(): ContactSurname {
    return this._surname;
  }

  change(name: ContactName, surname: ContactSurname): void {
    this._name = name;
    this._surname = surname;
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

  static create(
    accountId: AccountId,
    id: ContactId,
    name: ContactName,
    surname: ContactSurname,
    phone: Phone
  ): Contact {
    return new Contact(accountId, id, name, surname, phone);
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
