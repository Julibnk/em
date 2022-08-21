import { Template } from '@prisma/client';
import { TemplateEntity } from './template-entity';

export interface TemplateRepository {
  getById(id: string): TemplateEntity | null;

  create(template: TemplateEntity): TemplateEntity | null;

  save(template: TemplateEntity): TemplateEntity;

  getAll(): TemplateEntity[];
}
