import { TemplateEntity } from './template.entity';

interface ITemplateRepository {
  getById(id: string): Promise<TemplateEntity | null>;

  create(template: TemplateEntity): Promise<TemplateEntity | null>;

  save(template: TemplateEntity): Promise<TemplateEntity>;

  getAll(): Promise<TemplateEntity[]>;
}

export default ITemplateRepository;
