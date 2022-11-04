import { inject, injectable } from 'inversify';
import { namespaces } from '../../Shared/dependency-injection';
import { Template } from '../domain/Template';
import { TemplateRepository } from '../domain/TemplateRepository';

@injectable()
export class SearchAllTemplates {
  constructor(
    @inject(namespaces.TEMPLATE_REPOSITORY)
    private readonly repository: TemplateRepository
  ) {}

  run(): Promise<Array<Template>> {
    return this.repository.searchAll();
  }
}
