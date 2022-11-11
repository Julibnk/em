import { CategoryId } from '../../../../src/core/Category/domain/value-object/CategoryId';
import { UuidMother } from '../../Shared/domain/UuidMother';

export class CategoryIdMother {
  static create(value: string): CategoryId {
    return new CategoryId(value);
  }

  static random(): CategoryId {
    return this.create(UuidMother.random());
  }
}
