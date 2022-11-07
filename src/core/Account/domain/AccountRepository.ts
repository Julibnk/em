import { Account } from './Account';
import { AccountId } from './value-object/AccountId';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findById(id: AccountId): Promise<Account>;
}
