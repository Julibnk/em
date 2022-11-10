import { CategoryDescription } from '../../../../src/core/Category/domain/value-object/CategoryDescription';
import { CategoryId } from '../../../../src/core/Category/domain/value-object/CategoryId';
import { CategoryName } from '../../../../src/core/Category/domain/value-object/CategoryName';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { Category } from '../../../../src/core/Category/domain/Category';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { CategoryIdMother } from './CategoryIdMother';
import { CategoryNameMother } from './CategoryNameMother';
import { CategoryDescriptionMother } from './CategoryDescriptionMother';

export class CategoryMother {
  static create(
    accountId: AccountId,
    id: CategoryId,
    name: CategoryName,
    description: CategoryDescription,
    templateIds: Array<TemplateId>
  ): Category {
    return new Category(accountId, id, name, description, templateIds);
  }

  static random(
    accountId?: AccountId,
    templateIds?: Array<TemplateId>
  ): Category {
    return this.create(
      accountId || AccountIdMother.random(),
      CategoryIdMother.random(),
      CategoryNameMother.random(),
      CategoryDescriptionMother.random(),
      templateIds || []
    );
  }
}
