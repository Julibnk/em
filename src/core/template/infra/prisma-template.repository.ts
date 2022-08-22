import ITemplateRepo from '../domain/template.repository';

class PrismaTemplateRepo implements ITemplateRepo {
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

export default PrismaTemplateRepo;
