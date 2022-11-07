import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
// import { Phone } from '../../Shared/domain/Phone/Phone';
import { Primitives } from '../../Shared/domain/Primitives';
import { Disabled } from '../../Shared/domain/value-object/Disabled';
import { PhoneNumber } from '../../Shared/domain/value-object/PhoneNumber';
import { PhonePrefix } from '../../Shared/domain/value-object/PhonePrefix';
import { PhoneId } from './value-object/PhoneId';

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: PhoneId,
    readonly number: PhoneNumber,
    readonly prefix: PhonePrefix,
    readonly disabled: Disabled
  ) {
    super();
  }

  static fromPrimitives(plainData: Primitives<AccountPhone>): AccountPhone {
    return new AccountPhone(
      new AccountId(plainData.accountId),
      new PhoneId(plainData.id),
      new PhoneNumber(plainData.number),
      new PhonePrefix(plainData.prefix),
      new Disabled(plainData.disabled)
    );
  }

  toPrimitives(): Primitives<AccountPhone> {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      number: this.number.value,
      prefix: this.prefix.value,
      disabled: this.disabled.value,
    };
  }
}
