import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { TemplateNotFoundError } from '../../../../src/core/Template/domain/exceptions/TemplateNotFoundError';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';

export class TemplateRepositoryMock implements TemplateRepository {
  private mockSearchByName = jest.fn();
  private mockFindById = jest.fn();
  private mockSave = jest.fn();
  private mockSearchAll = jest.fn();

  private templates: Array<Template> = [];
  private template: Nullable<Template> = null;

  returnSearchByName(template: Template): void {
    this.template = template;
  }

  returnSearchAll(templates: Array<Template>): void {
    this.templates = templates;
  }

  returnFindById(template: Template): void {
    this.template = template;
  }

  async searchByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>> {
    this.mockSearchByName(accountId, name);
    return this.template;
  }

  async findById(accountId: AccountId, id: TemplateId): Promise<Template> {
    this.mockFindById(accountId, id);

    if (!this.template) {
      throw new TemplateNotFoundError(accountId, id);
    }

    return this.template;
  }

  async save(template: Template): Promise<void> {
    this.mockSave(template);
  }

  async searchAll(accountId: AccountId): Promise<Template[]> {
    this.mockSearchAll(accountId);
    return this.templates;
  }

  assertSaveHasBeenCalledWith(template: Template): void {
    expect(this.mockSave).toHaveBeenCalledWith(template);
  }

  assertSaveHasNotBeenCalledWith(template: Template): void {
    expect(this.mockSave).not.toHaveBeenCalledWith(template);
  }

  assertSearchAllHasBeenCalledWith(accountId: AccountId): void {
    expect(this.mockSearchAll).toHaveBeenCalledWith(accountId);
  }
}
