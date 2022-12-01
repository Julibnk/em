import { CategoryName } from '../../../../src/core/Category/domain/value-object/CategoryName';
import { WordMother } from '../../Shared/domain/WordMother';

export class CategoryNameMother {
  static create(value: string): CategoryName {
    return new CategoryName(value);
  }

  static random(): CategoryName {
    return this.create(WordMother.random());
  }
}
