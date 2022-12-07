import { Nullable } from '../Shared/Nullable';
import { Category, CategoryOnlyIds } from './Category';

export interface CategoryRepository {
  searchAll(): Promise<Category[]>;
  searchById(categoryId: string): Promise<Nullable<Category>>;
  save(category: CategoryOnlyIds): Promise<void>;
}
