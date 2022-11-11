import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DIRepository } from '../../Shared/dependency-injection';
import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';

@injectable()
export class SearchAllCategoriesUseCase {
  constructor(
    @inject(DIRepository.category)
    private repository: CategoryRepository
  ) {}

  run(accountId: string): Promise<Array<Category>> {
    return this.repository.searchAll(new AccountId(accountId));
  }
}
