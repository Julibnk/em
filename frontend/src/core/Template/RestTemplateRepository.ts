import { Nullable } from '../Shared/Nullable';
import { Template } from './Template';
import { TemplateRepository } from './TemplateRepository';

export class RestTemplateRepository implements TemplateRepository {
  async save(template: Template): Promise<void> {
    await fetch(`http://localhost:3000/template/${template.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      method: 'PUT',
      body: JSON.stringify(template),
    });
  }

  async searchAll(): Promise<Template[]> {
    const response = await fetch('http://localhost:3000/template', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const templates: Template[] = await response.json();
    return templates;
  }

  async searchById(templateId: string): Promise<Nullable<Template>> {
    const response = await fetch(
      `http://localhost:3000/template/${templateId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    const template: Nullable<Template> = await response.json();

    return template;
  }
}
