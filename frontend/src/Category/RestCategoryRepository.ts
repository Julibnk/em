import { Category, CategoryRepository } from './Category';

export class RestCategoryRespository implements CategoryRepository {
  searchAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  // ...
}
