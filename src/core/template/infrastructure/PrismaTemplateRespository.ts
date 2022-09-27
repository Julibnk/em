import { Template } from '../domain/Template';
import { TemplateId } from '../domain/TemplateId';
import { TemplateRepository } from '../domain/TemplateRepository';
import { injectable } from 'inversify';

@injectable()
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
