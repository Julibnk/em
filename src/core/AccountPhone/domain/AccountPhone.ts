import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { BoolValueObject } from '../../Shared/domain/value-object/BoolValueObject';
import { Primitives } from '../../Shared/domain/Primitives';

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly phone: Phone,
    readonly accountId: AccountId,
    readonly inactive: BoolValueObject
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
      new BoolValueObject(plainData.inactive)
    );
  }

  toPrimitives(): Primitives<AccountPhone> {
    throw new Error('Method not implemented.');
  }
}
