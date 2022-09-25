import { TemplateId } from './TemplateIds';
import { Template } from './Template';

export interface TemplateRepository {
  save(template: Template): Promise<void>;
  search(id: TemplateId): Promise<Template>;
  searchAll(): Promise<Array<Template>>;
}
