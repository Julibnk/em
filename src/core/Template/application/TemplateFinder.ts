import { Template } from '../domain/Template';
import { TemplateId } from '../domain/TemplateId';
import { TemplateRepository } from '../domain/TemplateRepository';

export class TemplateFinder {
  constructor(private readonly repository: TemplateRepository) {}

  run(id: string): Promise<Template> {
    return this.repository.findById(new TemplateId(id));
  }
}
