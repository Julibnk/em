import ITemplateRepository from '../domain/template.repository';

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
    return [];
  },
};

export default prismaTemplateRepository;
