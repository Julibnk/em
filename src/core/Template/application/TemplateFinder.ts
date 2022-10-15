import { Template } from '../domain/Template';
import { TemplateRepository } from '../domain/TemplateRepository';

export class TemplateFinder {
  constructor(private readonly repository: TemplateRepository) {}

  run(): Promise<Array<Template>> {
    return this.repository.searchAll();
  }
}
