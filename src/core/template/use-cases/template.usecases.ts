import { TemplateEntity } from '../domain/template.entity';
import ITemplateRepository from '../domain/template.repository';

export interface ITemplateUseCases {
  getAllTemplates: () => Promise<TemplateEntity[]>;
}

type IFactoryTemplateUseCases = (
  templateRepository: ITemplateRepository
) => ITemplateUseCases;

const factoryTemplateUseCases: IFactoryTemplateUseCases = (
  templateRepository: ITemplateRepository
) => {
  const getAllTemplates = (): Promise<TemplateEntity[]> => {
    return templateRepository.getAll();
  };

  return { getAllTemplates };
};

export default factoryTemplateUseCases;

// export class TemplateUseCases {
//   protected templateRepository: TemplateRepository;

//   constructor(templateRepository: TemplateRepository) {
//     this.templateRepository = templateRepository;
//   }

//   getAllTemplates(): Promise<TemplateEntity[]> {
//     return this.templateRepository.getAll();
//   }
// }
