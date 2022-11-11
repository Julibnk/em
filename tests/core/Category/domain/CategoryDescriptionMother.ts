import { CategoryDescription } from '../../../../src/core/Category/domain/value-object/CategoryDescription';
import { WordMother } from '../../Shared/domain/WordMother';

export class CategoryDescriptionMother {
  static create(value: string): CategoryDescription {
    return new CategoryDescription(value);
  }

  static random(): CategoryDescription {
    return this.create(WordMother.random());
  }
}
