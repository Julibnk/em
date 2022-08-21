import { TemplateEntity } from '../domain/template.entity';
import { TemplateDto } from './template.dto';

export const mapTemplateEntityToDto = (
  templateEntity: TemplateEntity
): TemplateDto => {
  return {
    name: templateEntity.name,
    description: templateEntity.description,
    preview: templateEntity.description,
    variable1: templateEntity.description,
    variable2: templateEntity.description,
    variable3: templateEntity.description,
  };
};

export const mapTemplateDtoToEntity = (
  templateDto: TemplateDto
): TemplateEntity => {
  return new TemplateEntity({
    ...templateDto,
  });
};
