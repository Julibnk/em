import { CategoryId } from '../value-object/CategoryId';
import { DomainError } from '../../../Shared/domain/DomainError';

export class CategoryNotFoundError extends DomainError {
  constructor(id: CategoryId) {
    super(`Category with id ${id.value} not found`);
  }
}
