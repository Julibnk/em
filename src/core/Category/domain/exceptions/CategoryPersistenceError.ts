import { DomainError } from '../../../Shared/domain/DomainError';
import { Category } from '../Category';

export class CategoryPersistenceError extends DomainError {
  constructor(category: Category) {
    super(
      `Category ${category.id} for account ${category.accountId} could not be saved`
    );
  }
}
