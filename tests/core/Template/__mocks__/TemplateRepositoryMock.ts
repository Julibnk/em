import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';

export class TemplateRepositoryMock implements TemplateRepository {
  private _mockSearchByName = jest.fn();
  private mockFindById = jest.fn();
  private _mockSave = jest.fn();
  private _mockSearchAll = jest.fn();

  setMockSearchByName(template: Nullable<Template>): void {
    this._mockSearchByName.mockReturnValue(template);
  }

  setMockSearchAll(templates: Array<Template>): void {
    this._mockSearchAll.mockReturnValue(templates);
  }

  setMockFindById(template: Template): void {
    this.mockFindById.mockReturnValue(template);
  }

  async searchByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>> {
    return this._mockSearchByName(accountId, name);
  }

  async findById(id: TemplateId): Promise<Template> {
    throw new Error('Method not implemented.');
  }

  async save(template: Template): Promise<void> {
    return this._mockSave(template);
  }

  async searchAll(): Promise<Template[]> {
    return this._mockSearchAll();
  }

  assertSaveHasBeenCalledWith(template: Template): void {
    expect(this._mockSave).toHaveBeenCalledWith(template);
  }
}
