import { Nullable } from '../Shared/Nullable';

export type Template = {
  id: string;
  name: string;
  description?: string;
  preview?: string;
  variable1?: string;
  variable2?: string;
  variable3?: string;
  categoryIds: string[];
};

export interface TemplateRepository {
  searchAll(): Promise<Template[]>;
  searchById(id: string): Promise<Nullable<Template>>;
}
