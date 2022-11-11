import { CategoryName } from '../value-object/CategoryName';
import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { DomainError } from '../../../Shared/domain/DomainError';

export class CategoryWithSameNameAlreadyExistsError extends DomainError {
  constructor(accountId: AccountId, name: CategoryName) {
    super(`Category ${name} already exists for account ${accountId}`);
  }
}
