import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../Shared/dependency-injection/namespaces';
import { TemplateId } from '../domain/TemplateId';
import { TemplateName } from '../domain/TemplateName';
import { TemplateShortDescription } from '../domain/TemplateShortDescription';
import { TemplateVariable } from '../domain/TemplateVariable';
import { TemplatePreview } from '../domain/TemplatePreview';

type Params = {
  id: string;
  name: string;
  shortDescription: string;
  preview: string;
  variable1: string;
  variable2: string;
  variable3: string;
};

@injectable()
export class TemplateCreator {
  constructor(
    @inject(DI_NAMESPACES.TEMPLATE_REPOSITORY)
    private repository: TemplateRepository
  ) {}

  async run({
    id,
    name,
    shortDescription,
    preview,
    variable1,
    variable2,
    variable3,
  }: Params): Promise<void> {
    const template = Template.create(
      new TemplateId(id),
      new TemplateName(name),
      new TemplateShortDescription(shortDescription),
      new TemplatePreview(preview),
      new TemplateVariable(variable1),
      new TemplateVariable(variable2),
      new TemplateVariable(variable3)
    );
    await this.repository.save(template);
  }
}
