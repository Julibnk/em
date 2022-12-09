import { Nullable } from '../../../../src/core/Shared/Nullable';
import { Template } from '../../../../src/core/Template/Template';
import { TemplateRepository } from '../../../../src/core/Template/TemplateRepository';

export class MockTemplateRepository implements TemplateRepository {
  mockSearchAll = vi.fn();
  mockSearchById = vi.fn();
  mockSave = vi.fn();

  private templateById: Nullable<Template> = null;
  private allTemplates: Template[] = [];

  async searchAll(): Promise<Template[]> {
    this.mockSearchAll();
    return this.allTemplates;
  }

  async searchById(id: string): Promise<Nullable<Template>> {
    this.mockSearchById(id);
    return this.templateById;
  }

  async save(template: Template): Promise<void> {
    this.mockSave(template);
  }

  setTemplateById(template: Nullable<Template>): void {
    this.templateById = template;
  }
  setAllTemplates(templates: Template[]): void {
    this.allTemplates = templates;
  }
}
