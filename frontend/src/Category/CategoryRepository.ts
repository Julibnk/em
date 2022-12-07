import { Nullable } from '../Shared/Nullable';
import { Category } from './Category';

export interface CategoryRepository {
  searchAll(): Promise<Category[]>;
  searchById(categoryId: string): Promise<Nullable<Category>>;
  save(category: Category): Promise<void>;
}
