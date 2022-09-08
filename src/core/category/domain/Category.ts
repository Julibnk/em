import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateId } from '../../Template/domain/TemplateId';
import { CategoryId } from './CategoryId';
import { CategoryName } from './CategoryName';
import { CategoryShortDescription } from './CategoryShortDescription';

export class Category extends AggregateRoot {
  constructor(
    readonly id: CategoryId,
    readonly name: CategoryName,
    readonly shortDescription: CategoryShortDescription,
    readonly templateIds: TemplateId[]
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    shortDescription: string;
    temmplateIds: string[];
  }): Category {
    return new Category(
      new CategoryId(plainData.id),
      new CategoryName(plainData.name),
      new CategoryShortDescription(plainData.shortDescription),
      plainData.temmplateIds.map((templateId) => new TemplateId(templateId))
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      shortDescription: this.shortDescription.value,
      templateIds: this.templateIds.map((templateId) => templateId.value),
    };
  }
}
