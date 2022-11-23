import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DiRepository } from '../../Shared/dependency-injection';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';
import { CategoryId } from '../domain/value-object/CategoryId';
import { CategoryName } from '../domain/value-object/CategoryName';
import { CategoryDescription } from '../domain/value-object/CategoryDescription';
import { CategoryWithSameNameAlreadyExistsError } from '../domain/exceptions/CategoryWithSameNameAlreadyExistsError';

export type Params = {
  accountId: string;
  id: string;
  name: string;
  description: string;
  templateIds: Array<string>;
};

@injectable()
export class SaveCategoryUseCase {
  constructor(
    @inject(DiRepository.category)
    private repository: CategoryRepository
  ) {}

  async run(params: Params): Promise<void> {
    const accountId = new AccountId(params.accountId);
    const id = new CategoryId(params.id);
    const name = new CategoryName(params.name);
    const description = new CategoryDescription(params.description);
    const templateIds = params.templateIds.map(
      (templateId) => new TemplateId(templateId)
    );

    let category = await this.repository.findById(accountId, id);

    if (category) {
      category.change(name, description, templateIds);
    } else {
      const categoryWithSameName = await this.repository.findByName(
        accountId,
        name
      );

      if (categoryWithSameName) {
        throw new CategoryWithSameNameAlreadyExistsError(name);
      }

      category = Category.create(accountId, id, name, description, templateIds);
    }

    await this.repository.save(category);
  }
}
