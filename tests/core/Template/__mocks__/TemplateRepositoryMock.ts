import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { TemplateNotFoundError } from '../../../../src/core/Template/domain/exceptions/TemplateNotFoundError';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';

export class TemplateRepositoryMock implements TemplateRepository {
  mockSearchByName = jest.fn();
  mockFindById = jest.fn();
  mockSave = jest.fn();
  mockSearchAll = jest.fn();

  private allTemplates: Array<Template> = [];
  private templateByName: Nullable<Template> = null;
  private templateById?: Template;

  returnSearchByName(template: Template): void {
    this.templateByName = template;
  }

  returnSearchAll(templates: Array<Template>): void {
    this.allTemplates = templates;
  }

  returnFindById(template: Template): void {
    this.templateById = template;
  }

  async searchByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>> {
    this.mockSearchByName(accountId, name);
    return this.templateByName;
  }

  async findById(accountId: AccountId, id: TemplateId): Promise<Template> {
    this.mockFindById(accountId, id);

    if (!this.templateById) {
      throw new TemplateNotFoundError(id);
    }

    return this.templateById;
  }

  async save(template: Template): Promise<void> {
    this.mockSave(template);
  }

  async searchAll(accountId: AccountId): Promise<Template[]> {
    this.mockSearchAll(accountId);
    return this.allTemplates;
  }
}
