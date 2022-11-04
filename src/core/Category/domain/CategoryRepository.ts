import { CategoryId } from './value-object/CategoryId';
import { Category } from './Category';

export interface CategoryRepository {
  save(template: Category): Promise<void>;
  search(id: CategoryId): Promise<Category>;
  searchAll(): Promise<Array<Category>>;
}
