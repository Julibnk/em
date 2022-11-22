import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Primitives } from '../../Shared/domain/Primitives';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { PhoneId } from './value-object/PhoneId';

type PhonePrimitives = Primitives<Phone>;
type AccountPhonePrimitives = Omit<Primitives<AccountPhone>, 'phone'> &
  PhonePrimitives;

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: PhoneId,
    readonly phone: Phone
  ) {
    super();
  }

  static fromPrimitives(plainData: AccountPhonePrimitives): AccountPhone {
    return new AccountPhone(
      new AccountId(plainData.accountId),
      new PhoneId(plainData.id),
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
