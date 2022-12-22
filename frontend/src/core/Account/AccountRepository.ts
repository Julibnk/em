import { Nullable } from '../Shared/Nullable';
import { Account } from './Account';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  searchById(id: string): Promise<Nullable<Account>>;
}
