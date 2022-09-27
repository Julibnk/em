import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { Primitives } from '../../Shared/domain/common/Primitives';
import { injectable, inject } from 'inversify';
import { CategoryRepository } from '../../Category/domain/CategoryRepository';

@injectable()
export class TemplateCreator {
  constructor(private readonly repository: CategoryRepository) {}

  async run(plainData: Primitives<Template>): Promise<void> {
    // const template = Template.fromPrimitives(plainData);
    // await this.repository.save(template);
  }
}
