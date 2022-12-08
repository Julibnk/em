import { Nullable } from '../../../../src/core/Shared/Nullable';
import { Template } from '../../../../src/core/Template/Template';
import { TemplateRepository } from '../../../../src/core/Template/TemplateRepository';

export class MockTemplateRepository implements TemplateRepository {
  private templates: Template[] = [];

  async searchAll(): Promise<Template[]> {
    return this.templates;
  }

  async searchById(id: string): Promise<Nullable<Template>> {
    return null;
    // return this.categories.find((category) => category.id === id);
  }

  async save(template: Template): Promise<void> {
    // return null;
  }
}
