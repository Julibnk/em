import { DomainError } from '../../../Shared/domain/DomainError';
import { AccountId } from '../value-object/AccountId';

export class AccountNotFoundError extends DomainError {
  constructor(id: AccountId) {
    super(`Account with id ${id.value} not found`);
  }
}
