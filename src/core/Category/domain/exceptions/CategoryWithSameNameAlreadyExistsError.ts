import { CategoryName } from '../value-object/CategoryName';
import { DomainError } from '../../../Shared/domain/DomainError';

export class CategoryWithSameNameAlreadyExistsError extends DomainError {
  constructor(name: CategoryName) {
    super(`Category ${name} already exists`);
  }
}
