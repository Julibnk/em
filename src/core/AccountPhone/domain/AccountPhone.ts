import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Primitives } from '../../Shared/domain/Primitives';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { AccountPhoneId } from './value-object/AccountPhoneId';

type PhonePrimitives = Primitives<Phone>;
type AccountPhonePrimitives = Omit<Primitives<AccountPhone>, 'phone'> &
  PhonePrimitives;

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: AccountPhoneId,
    readonly phone: Phone
  ) {
    super();
  }

  static create(
    accountId: AccountId,
    id: AccountPhoneId,
    phone: Phone
  ): AccountPhone {
    return new AccountPhone(accountId, id, phone);
  }

  static fromPrimitives(plainData: AccountPhonePrimitives): AccountPhone {
    return new AccountPhone(
      new AccountId(plainData.accountId),
      new AccountPhoneId(plainData.id),
      Phone.fromPrimitives(plainData.prefix, plainData.number)
    );
  }

  toPrimitives(): Primitives<AccountPhonePrimitives> {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      prefix: this.phone.prefix.value,
      number: this.phone.number.value,
    };
  }
}
