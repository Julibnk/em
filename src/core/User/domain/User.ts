import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { BoolValueObject } from '../../Shared/domain/value-object/BoolValueObject';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';
import { UserName } from './value-object/UserName';
import { UserRole } from './value-object/UserRole';

export class User extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: UserId,
    readonly name: UserName,
    readonly email: UserEmail,
    readonly inactive: BoolValueObject,
    readonly role: UserRole
  ) {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
