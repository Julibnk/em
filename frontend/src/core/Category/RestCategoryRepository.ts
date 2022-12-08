import { RestClient } from '../RestClient/RestClient';
import { Nullable } from '../Shared/Nullable';
import { Category, CategoryOnlyIds } from './Category';
import { CategoryRepository } from './CategoryRepository';

export class RestCategoryRespository implements CategoryRepository {
  constructor(private client: RestClient) {}

  async searchById(categoryId: string): Promise<Nullable<Category>> {
    const response = await this.client.get(`category/${categoryId}`);
    const category: Nullable<Category> = await response.json();
    return category;
  }

  async save(category: CategoryOnlyIds): Promise<void> {
    await this.client.put<CategoryOnlyIds>(`category/${category.id}`, category);
  }

  async searchAll(): Promise<Category[]> {
    const response = await this.client.get('category');
    const categories: Category[] = await response.json();
    return categories;
  }
}
