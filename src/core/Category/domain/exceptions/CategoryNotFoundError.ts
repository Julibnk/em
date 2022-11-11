import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { CategoryId } from '../value-object/CategoryId';
import { DomainError } from '../../../Shared/domain/DomainError';

export class CategoryNotFoundError extends DomainError {
  constructor(accountId: AccountId, id: CategoryId) {
    super(
      `Category with id ${id.value} not found for account ${accountId.value}`
    );
  }
}
