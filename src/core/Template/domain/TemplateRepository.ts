import { TemplateId } from './TemplateId';
import { Template } from './Template';
import { Nullable } from '../../Shared/domain/Nullable';

export interface TemplateRepository {
  save(template: Template): Promise<void>;
  // search(template: Partial<TemplateId>): Promise<Nullable<Template>>;
  searchAll(): Promise<Array<Template>>;
  findById(id: TemplateId): Promise<Template>;
}
