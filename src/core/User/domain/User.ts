import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';
import { UserName } from './value-object/UserName';
import { UserRole } from './value-object/UserRole';
import { Disabled } from '../../Shared/domain/value-object/Disabled';
import { Primitives } from '../../Shared/domain/Primitives';

export class User extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: UserId,
    readonly name: UserName,
    readonly email: UserEmail,
    readonly disabled: Disabled,
    readonly role: UserRole
  ) {
    super();
  }

  static fromPrimtives(primitives: Primitives<User>): User {
    return new User(
      new AccountId(primitives.accountId),
      new UserId(primitives.id),
      new UserName(primitives.name),
      new UserEmail(primitives.email),
      new Disabled(primitives.disabled),
      UserRole.fromValue(primitives.role)
    );
  }

  toPrimitives(): Primitives<User> {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      disabled: this.disabled.value,
      role: this.role.value,
    };
  }
}
