import { Nullable } from '../Shared/Nullable';
import { Category } from './Category';
import { CategoryRepository } from './CategoryRepository';

export class RestCategoryRespository implements CategoryRepository {
  async searchById(categoryId: string): Promise<Nullable<Category>> {
    const response = await fetch(
      `http://localhost:3000/category/${categoryId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    const category: Nullable<Category> = await response.json();

    return category;
  }

  async save(category: Category): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async searchAll(): Promise<Category[]> {
    const response = await fetch('http://localhost:3000/category', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const categories: Category[] = await response.json();
    return categories;
  }
}
