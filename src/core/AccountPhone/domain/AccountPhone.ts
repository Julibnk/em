import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { Primitives } from '../../Shared/domain/Primitives';
import { Disabled } from '../../Shared/domain/value-object/Disabled';

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly phone: Phone,
    readonly accountId: AccountId,
    readonly disabled: Disabled
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
      new Disabled(plainData.disabled)
    );
  }

  toPrimitives(): Primitives<AccountPhone> {
    throw new Error('Method not implemented.');
  }
}
