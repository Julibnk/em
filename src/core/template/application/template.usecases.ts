import { Template } from '../domain/template.entity';
import ITemplateRepository from '../domain/template.repository';

// Casos de uso de Plantillas
export interface ITemplateUseCases {
  getAllTemplates: () => Promise<Template[]>;
}

class TemplateUseCases implements ITemplateUseCases {
  constructor(private templateRepository: ITemplateRepository) {}

  getAllTemplates(): Promise<Template[]> {
    return this.templateRepository.getAll();
  }
}

export default TemplateUseCases;
