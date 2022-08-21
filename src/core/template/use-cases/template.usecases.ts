import { TemplateEntity } from '../domain/template.entity';
import ITemplateRepository from '../domain/template.repository';

// Definicion de la funcion factory
type IFactoryTemplateUseCases = (
  templateRepository: ITemplateRepository
) => ITemplateUseCases;

// Casos de uso de Plantillas
export interface ITemplateUseCases {
  getAllTemplates: () => Promise<TemplateEntity[]>;
}

// Factory para casos de uso que recibe por inyeccion el repository
const factoryTemplateUseCases: IFactoryTemplateUseCases = (
  templateRepository: ITemplateRepository
) => {
  const getAllTemplates = (): Promise<TemplateEntity[]> => {
    return templateRepository.getAll();
  };

  return { getAllTemplates };
};

export default factoryTemplateUseCases;
