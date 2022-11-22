import { Nullable } from '../../Shared/domain/Nullable';
import { Account } from './Account';
import { AccountId } from './value-object/AccountId';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findById(id: AccountId): Promise<Nullable<Account>>;
}
