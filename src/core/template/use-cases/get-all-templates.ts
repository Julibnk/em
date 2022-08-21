import { TemplateEntity } from '../template-entity';
import { TemplateRepository } from '../template-repository';

export const getAllTemplates = (templateRepository: TemplateRepository) => {
  const execute = async (): Promise<TemplateEntity[]> => {
    return templateRepository.getAll();
  };

  return { execute };
};
