import { DomainError } from '../../../Shared/domain/DomainError';
import { AccountId } from '../value-object/AccountId';

export class AccountNotFoundError extends DomainError {
  constructor(accountId: AccountId) {
    super(`Account with id ${accountId.value} not found`);
  }
}
