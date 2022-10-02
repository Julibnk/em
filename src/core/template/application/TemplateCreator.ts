import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { Primitives } from '../../Shared/domain/common/Primitives';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../Shared/dependency-injection/namespaces';
import { TemplateStatus } from '../domain/TemplateStatus';
import { TemplateId } from '../domain/TemplateId';
import { TemplateName } from '../domain/TemplateName';
import { TemplateShortDescription } from '../domain/TemplateShortDescription';
import { TemplateVariable } from '../domain/TemplateVariable';
import { TemplatePreview } from '../domain/TemplatePreview';

type Params = {
  id: TemplateId;
  name: TemplateName;
  shortDescription: TemplateShortDescription;
  preview: TemplatePreview;
  variable1: TemplateVariable;
  variable2: TemplateVariable;
  variable3: TemplateVariable;
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
      id,
      name,
      shortDescription,
      preview,
      variable1,
      variable2,
      variable3
    );
    await this.repository.save(template);
  }
}
