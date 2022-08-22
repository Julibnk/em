import { Template } from '../domain/template.entity';
import { TemplateDto } from '../infra/template.dto';
import { UniqueEntityId } from '../../common/domain/entity-id';

export const mapTemplateToDto = (template: Template): TemplateDto => {
  return {
    id: template.id.getValue(),
    name: template.name,
    description: template.description,
    preview: template.preview,
    variable1: template.variable1,
    variable2: template.variable2,
    variable3: template.variable3,
  };
};

export const mapTemplateDtoToDomain = (templateDto: TemplateDto): Template => {
  return new Template(
    {
      ...templateDto,
    },
    new UniqueEntityId(templateDto.id)
  );
};
