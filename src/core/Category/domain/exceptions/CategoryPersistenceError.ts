import { DomainError } from '../../../Shared/domain/DomainError';
import { Category } from '../Category';

export class CategoryPersistenceError extends DomainError {
  constructor(category: Category) {
    super(`Category ${category.name}  could not be saved`);
  }
}
