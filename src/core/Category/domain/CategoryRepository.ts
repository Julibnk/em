import { CategoryId } from './value-object/CategoryId';
import { Category } from './Category';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  findById(accountId: AccountId, id: CategoryId): Promise<Category>;
  searchAll(accountId: AccountId): Promise<Array<Category>>;
}
