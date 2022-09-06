import ITemplateRepo from '../domain/template.repository';
import prismaClient from '../../../apps/config/prisma';

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
    const allTemplates = await prismaClient.template.findMany();
    return [];
  }
}

export default PrismaTemplateRepo;
