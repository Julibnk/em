import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { CategoryId } from '../value-object/CategoryId';

export class CategoryNotFoundError extends Error {
  constructor(accountId: AccountId, id: CategoryId) {
    super(
      `Category with id ${id.value} not found for account ${accountId.value}`
    );
  }
}
