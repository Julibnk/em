import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { Primitives } from '../../Shared/domain/Primitives';
import { DisabledValueObject } from '../../Shared/domain/value-object/DisabledValueObject';

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly phone: Phone,
    readonly accountId: AccountId,
    readonly disabled: DisabledValueObject
  ) {
    super();
  }

  static fromPrimitives(plainData: Primitives<AccountPhone>): AccountPhone {
    return new AccountPhone(
      Phone.fromPrimitives({
        id: plainData.phone.id,
        number: plainData.phone.number,
        prefix: plainData.phone.prefix,
      }),
      new AccountId(plainData.accountId),
      new DisabledValueObject(plainData.disabled)
    );
  }

  toPrimitives(): Primitives<AccountPhone> {
    throw new Error('Method not implemented.');
  }
}
