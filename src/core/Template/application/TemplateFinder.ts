import { Template } from '../domain/Template';
import { TemplateId } from '../domain/value-object/TemplateId';
import { TemplateRepository } from '../domain/TemplateRepository';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export class TemplateFinder {
  constructor(private readonly repository: TemplateRepository) {}

  run(accountId: string, id: string): Promise<Template> {
    return this.repository.findById(
      new AccountId(accountId),
      new TemplateId(id)
    );
  }
}
