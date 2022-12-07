import { Category } from './Category';
import { CategoryRepository } from './CategoryRepository';

export class RestCategoryRespository implements CategoryRepository {
  searchAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  // ...
}
