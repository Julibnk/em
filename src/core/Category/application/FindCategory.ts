import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';
import { CategoryId } from '../domain/value-object/CategoryId';

export class FindCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  run(accountId: string, id: string): Promise<Category> {
    return this.repository.findById(
      new AccountId(accountId),
      new CategoryId(id)
    );
  }
}
