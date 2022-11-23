import { AccountPhoneId } from '../../../../src/core/AccountPhone/domain/value-object/AccountPhoneId';
import { UuidMother } from '../../Shared/domain/UuidMother';

export class AccountPhoneIdMother {
  static create(value: string): AccountPhoneId {
    return new AccountPhoneId(value);
  }

  static random(): AccountPhoneId {
    return this.create(UuidMother.random());
  }
}
