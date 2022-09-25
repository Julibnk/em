import { Template } from '../domain/Template';
import { TemplateId } from '../domain/TemplateIds';
import { TemplateRepository } from '../domain/TemplateRepository';
export class PrismaTemplateRepository implements TemplateRepository {
  save(template: Template): Promise<void> {
    throw new Error('Method not implemented.');
  }
  search(id: TemplateId): Promise<Template> {
    throw new Error('Method not implemented.');
  }
  searchAll(): Promise<Array<Template>> {
    throw new Error('Method not implemented.');
  }
}
