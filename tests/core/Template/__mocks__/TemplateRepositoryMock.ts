import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateId } from '../../../../src/core/Template/domain/TemplateId';
import { TemplateRepository } from '../../../../src/core/Template/domain/TemplateRepository';

export class TemplateRepositoryMock implements TemplateRepository {
  findById(id: TemplateId): Promise<Template> {
    throw new Error('Method not implemented.');
  }
  save(template: Template): Promise<void> {
    throw new Error('Method not implemented.');
  }
  search(id: TemplateId): Promise<Nullable<Template>> {
    throw new Error('Method not implemented.');
  }
  searchAll(): Promise<Template[]> {
    throw new Error('Method not implemented.');
  }
}
