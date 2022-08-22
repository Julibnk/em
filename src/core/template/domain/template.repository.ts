import Template from './template.entity';

interface ITemplateRepo {
  getById(id: string): Promise<Template | null>;

  create(template: Template): Promise<Template | null>;

  save(template: Template): Promise<Template>;

  getAll(): Promise<Template[]>;
}

export default ITemplateRepo;
