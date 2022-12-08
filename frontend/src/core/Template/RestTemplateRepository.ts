import { RestClient } from '../RestClient/RestClient';
import { Nullable } from '../Shared/Nullable';
import { Template } from './Template';
import { TemplateRepository } from './TemplateRepository';

export class RestTemplateRepository implements TemplateRepository {
  constructor(private client: RestClient) {}

  async searchById(id: string): Promise<Nullable<Template>> {
    const response = await this.client.get(`template/${id}`);
    const template: Nullable<Template> = await response.json();
    return template;
  }

  async save(template: Template): Promise<void> {
    await this.client.put<Template>(`template/${template.id}`, template);
  }

  async searchAll(): Promise<Template[]> {
    const response = await this.client.get('template');
    const categories: Template[] = await response.json();
    return categories;
  }
}
