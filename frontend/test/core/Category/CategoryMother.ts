import { Category } from '../../../src/core/Category/Category';
import { UuidMother } from '../Shared/UuidMother';
import { WordMother } from '../Shared/WordMother';

export class CategoryMother {
  static create(params: Partial<Category>): Category {
    const category: Category = {
      id: UuidMother.random(),
      name: WordMother.random(),
      description: WordMother.random(),
      templates: [],
      ...params,
    };
    return category;
  }
}
