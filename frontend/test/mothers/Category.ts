import { Category } from '../../src/Category/Category';
// import faker from 'faker';

export class CategoryMother {
  static create(params: Partial<Category>): Category {
    const category: Category = {
      id: '',
      name: '',
      description: '',
      templateIds: [],
      ...params,
    };
    return category;
  }
}
