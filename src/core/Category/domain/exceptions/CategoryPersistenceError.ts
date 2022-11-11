import { Category } from '../Category';

export class CategoryPersistenceError extends Error {
  constructor(category: Category) {
    super(
      `Category ${category.id} for account ${category.accountId} could not be saved`
    );
  }
}
