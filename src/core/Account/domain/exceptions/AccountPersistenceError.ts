import { DomainError } from '../../../Shared/domain/DomainError';
import { Account } from '../Account';

export class AccountPersistenceError extends DomainError {
  constructor(account: Account) {
    super(`Account ${account.id.value} couldn't be saved`);
  }
}
