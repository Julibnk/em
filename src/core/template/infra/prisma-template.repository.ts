import ITemplateRepository from '../domain/template.repository';

class PrismaTemplateRepository implements ITemplateRepository {
  async save(template) {
    return template;
  }

  async create(template) {
    return null;
  }

  async getById(id) {
    return null;
  }

  async getAll() {
    return [];
  }
}

export default PrismaTemplateRepository;
