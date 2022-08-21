import { TemplateEntity } from '../domain/template.entity';
import ITemplateRepository from '../domain/template.repository';

const templateInit = {
  name: 'plantilla mock',
  description: 'descripcion plantilla mock ',
};

const prismaTemplateRepository: ITemplateRepository = {
  async save(template) {
    return template;
  },
  async create(template) {
    return null;
  },

  async getById(id) {
    return null;
  },

  async getAll() {
    return [
      new TemplateEntity(templateInit),
      new TemplateEntity(templateInit),
      new TemplateEntity(templateInit),
    ];
  },
};

export default prismaTemplateRepository;
