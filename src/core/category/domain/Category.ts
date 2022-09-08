import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { CategoryId } from './CategoryId';
import { CategoryName } from './CategoryName';
import { CategoryShortDescription } from './CategoryShortDescription';

export class Category extends AggregateRoot {
  readonly id: CategoryId;
  readonly name: CategoryName;
  readonly shortDescription: CategoryShortDescription;

  constructor(
    id: CategoryId,
    name: CategoryName,
    shortDescription: CategoryShortDescription
  ) {
    super();
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    shortDescription: string;
  }): Category {
    return new Category(
      new CategoryId(plainData.id),
      new CategoryName(plainData.name),
      new CategoryShortDescription(plainData.shortDescription)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      shortDescription: this.shortDescription.value,
    };
  }
}
