import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DIRepository } from '../../Shared/dependency-injection';
import { Template } from '../domain/Template';
import { TemplateRepository } from '../domain/TemplateRepository';

@injectable()
export class SearchAllTemplates {
  constructor(
    @inject(DIRepository.template)
    private readonly repository: TemplateRepository
  ) {}

  run(accountId: string): Promise<Array<Template>> {
    return this.repository.searchAll(new AccountId(accountId));
  }
}
