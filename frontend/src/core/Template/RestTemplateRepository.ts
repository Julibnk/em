import {
  RestClient,
  isResponseWithMessage,
} from '../Shared/RestClient/RestClient';
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
    const response = await this.client.put<Template>(
      `template/${template.id}`,
      template
    );

    if (!response.ok) {
      const body: unknown = await response.json();

      if (isResponseWithMessage(body)) {
        throw new Error(body.message);
      }

      throw new Error('La plantilla no se ha podido guardar');
    }
  }

  async searchAll(): Promise<Template[]> {
    const response = await this.client.get('template');
    const categories: Template[] = await response.json();
    return categories;
  }
}
