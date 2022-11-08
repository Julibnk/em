import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';

export class TemplateRepositoryMock implements TemplateRepository {
  private _mockSearchByName = jest.fn();
  private _mockFindById = jest.fn();
  private _mockSave = jest.fn();
  private _mockSearchAll = jest.fn();

  private templates: Array<Template> = [];
  private template: Nullable<Template> = null;

  setMockSearchByName(template: Template): void {
    this.template = template;
  }

  setMockSearchAll(templates: Array<Template>): void {
    this.templates = templates;
  }

  async searchByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>> {
    this._mockSearchByName(accountId, name);
    return this.template;
  }

  async findById(): Promise<Template> {
    throw new Error('Method not implemented.');
  }

  async save(template: Template): Promise<void> {
    this._mockSave(template);
  }

  async searchAll(accountId: AccountId): Promise<Template[]> {
    this._mockSearchAll(accountId);
    return this.templates;
  }

  assertSaveHasBeenCalledWith(template: Template): void {
    expect(this._mockSave).toHaveBeenCalledWith(template);
  }

  assertSearchAllHasBeenCalledWith(accountId: AccountId): void {
    expect(this._mockSearchAll).toHaveBeenCalledWith(accountId);
  }
}
