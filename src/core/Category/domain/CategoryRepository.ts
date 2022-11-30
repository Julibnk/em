import { CategoryId } from './value-object/CategoryId';
import { Category } from './Category';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { CategoryName } from './value-object/CategoryName';
import { Nullable } from '../../Shared/domain/Nullable';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  findById(accountId: AccountId, id: CategoryId): Promise<Nullable<Category>>;
  findByName(
    accountId: AccountId,
    name: CategoryName
  ): Promise<Nullable<Category>>;
  searchAll(accountId: AccountId): Promise<Array<Category>>;
}
