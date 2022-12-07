import { Nullable } from '../Shared/Nullable';
import { Template } from './Template';

export interface TemplateRepository {
  searchAll(): Promise<Template[]>;
  searchById(id: string): Promise<Nullable<Template>>;
  save(template: Template): Promise<void>;
}
