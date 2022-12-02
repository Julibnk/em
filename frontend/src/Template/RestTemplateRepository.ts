import { Nullable } from '../Shared/Nullable';
import { Template, TemplateRepository } from './Template';

export class RestTemplateRepository implements TemplateRepository {
  async searchAll(): Promise<Template[]> {
    const response = await fetch('http://localhost:3000/template');

    const templates: Template[] = await response.json();

    return templates;
  }

  async searchById(id: string): Promise<Nullable<Template>> {
    const response = await fetch(`http://localhost:3000/template/${id}`);

    const template: Nullable<Template> = await response.json();

    return template;
  }
}
