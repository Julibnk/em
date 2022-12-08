import {
  Category,
  CategoryOnlyIds,
} from '../../../../src/core/Category/Category';
import { CategoryRepository } from '../../../../src/core/Category/CategoryRepository';
import { Nullable } from '../../../../src/core/Shared/Nullable';

export class MockCategoryRepository implements CategoryRepository {
  private categories: Category[] = [];

  async searchAll(): Promise<Category[]> {
    return this.categories;
  }

  async searchById(id: string): Promise<Nullable<Category>> {
    return null;
    // return this.categories.find((category) => category.id === id);
  }

  async save(category: CategoryOnlyIds): Promise<void> {
    // const categoryIndex = this.categories.findIndex(
    //   (category) => category.id === category.id
    // );
    // if (categoryIndex !== -1) {
    //   this.categories[categoryIndex] = category;
    // } else {
    //   this.categories.push(category);
    // }
  }
}
