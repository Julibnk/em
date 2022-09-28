import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { Primitives } from '../../Shared/domain/common/Primitives';
import { inject, injectable } from 'inversify';
import { DI_NAMESPACES } from '../../Shared/dependency-injection/namespaces';

@injectable()
export class TemplateCreator {
  constructor(
    @inject(DI_NAMESPACES.TEMPLATE_REPOSITORY)
    private repository: TemplateRepository
  ) {}

  async run(plainData: Primitives<Template>): Promise<void> {
    const template = Template.fromPrimitives(plainData);
    await this.repository.save(template);
  }
}
