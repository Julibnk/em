import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Nullable } from '../../Shared/domain/Nullable';
import { AccountPhone } from './AccountPhone';
import { AccountPhoneId } from './value-object/AccountPhoneId';
import { Phone } from '../../Shared/domain/Phone/Phone';

export interface AccountPhoneRepository {
  save(accountPhone: AccountPhone): Promise<void>;

  searchAll(accountId: AccountId): Promise<Array<AccountPhone>>;

  findById(
    accountId: AccountId,
    id: AccountPhoneId
  ): Promise<Nullable<AccountPhone>>;

  findByPhone(
    accountId: AccountId,
    phone: Phone
  ): Promise<Nullable<AccountPhone>>;
}
