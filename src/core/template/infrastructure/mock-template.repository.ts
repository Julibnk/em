// import { Template } from '../domain/template.entity';
import ITemplateRepo from '../domain/template.repository';

const templateInit = {
  name: 'plantilla mock',
  description: 'descripcion plantilla mock ',
};

class MockTemplateRepo implements ITemplateRepo {
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
    return [
      // new Template(templateInit),
      // new Template(templateInit),
      // new Template(templateInit),
    ];
  }
}

export default MockTemplateRepo;
