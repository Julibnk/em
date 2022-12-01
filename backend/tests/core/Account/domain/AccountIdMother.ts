import { UuidMother } from '../../Shared/domain/UuidMother';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';

export class AccountIdMother {
  static create(value: string): AccountId {
    return new AccountId(value);
  }

  static random(): AccountId {
    return this.create(UuidMother.random());
  }
}
