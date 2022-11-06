import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { Phone } from '../../Shared/domain/Phone/Phone';
import { BoolValueObject } from '../../Shared/domain/value-object/BoolValueObject';

export class AccountPhone extends AggregateRoot {
  constructor(
    readonly phone: Phone,
    readonly accountId: AccountId,
    readonly inactive: BoolValueObject
  ) {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
