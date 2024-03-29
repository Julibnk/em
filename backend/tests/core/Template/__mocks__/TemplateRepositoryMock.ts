import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';

export class TemplateRepositoryMock implements TemplateRepository {
  mockFindByName = jest.fn();
  mockFindById = jest.fn();
  mockSave = jest.fn();
  mockSearchAll = jest.fn();

  private allTemplates: Array<Template> = [];
  private templateByName: Nullable<Template> = null;
  private templateById: Nullable<Template> = null;

  returnFindByName(template: Template): void {
    this.templateByName = template;
  }

  returnSearchAll(templates: Array<Template>): void {
    this.allTemplates = templates;
  }

  returnFindById(template: Template): void {
    this.templateById = template;
  }

  async findByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>> {
    this.mockFindByName(accountId, name);
    return this.templateByName;
  }

  async findById(
    accountId: AccountId,
    id: TemplateId
  ): Promise<Nullable<Template>> {
    this.mockFindById(accountId, id);

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
