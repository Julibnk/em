import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountPhone } from '../../../../src/core/AccountPhone/domain/AccountPhone';
import { AccountPhoneId } from '../../../../src/core/AccountPhone/domain/value-object/AccountPhoneId';
import { Phone } from '../../../../src/core/Shared/domain/Phone/Phone';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { PhoneMother } from '../../Shared/domain/Phone/PhoneMother';
import { AccountPhoneIdMother } from './AccountPhoneIdMother';

export class AccountPhoneMother {
  static create(
    accountId: AccountId,
    id: AccountPhoneId,
    phone: Phone
  ): AccountPhone {
    return new AccountPhone(accountId, id, phone);
  }

  static withAccount(accountId: AccountId): AccountPhone {
    return this.create(
      accountId,
      AccountPhoneIdMother.random(),
      PhoneMother.random()
    );
  }

  static makeCopy(accuntPhone: AccountPhone): AccountPhone {
    return this.create(
      accuntPhone.accountId,
      accuntPhone.id,
      accuntPhone.phone
    );
  }

  static random(): AccountPhone {
    return this.create(
      AccountIdMother.random(),
      AccountPhoneIdMother.random(),
      PhoneMother.random()
    );
  }
}
