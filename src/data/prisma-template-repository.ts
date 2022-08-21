import { TemplateRepository } from '../core/template/template-repository';

export const PrismaTemplateRepository: TemplateRepository = {
  save(template) {
    return template;
  },
  create(template) {
    return null;
  },

  getById(id) {
    return null;
  },

  getAll() {
    return [];
  },
};
