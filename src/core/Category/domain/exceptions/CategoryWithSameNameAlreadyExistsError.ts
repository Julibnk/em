import { CategoryName } from '../value-object/CategoryName';
import { AccountId } from '../../../Account/domain/value-object/AccountId';

export class CategoryWithSameNameAlreadyExistsError extends Error {
  constructor(accountId: AccountId, name: CategoryName) {
    super(`Category ${name} already exists for account ${accountId}`);
  }
}
