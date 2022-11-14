import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DIDomain } from '../../Shared/dependency-injection';
import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';
import { CategoryId } from '../domain/value-object/CategoryId';

@injectable()
export class FindCategoryUseCase {
  constructor(
    @inject(DIDomain.category) private readonly repository: CategoryRepository
  ) {}

  run(accountId: string, id: string): Promise<Category> {
    return this.repository.findById(
      new AccountId(accountId),
      new CategoryId(id)
    );
  }
}
