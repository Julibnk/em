import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { Primitives } from '../../Shared/domain/common/Primitives';

export class TemplateCreator {
  constructor(private readonly repository: TemplateRepository) {}

  async run(plainData: Primitives<Template>): Promise<void> {
    const template = Template.fromPrimitives(plainData);
    await this.repository.save(template);
  }
}
