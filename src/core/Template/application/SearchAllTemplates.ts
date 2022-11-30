import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { DiRepository } from '../../Shared/dependency-injection';
import { Template } from '../domain/Template';
import { TemplateRepository } from '../domain/TemplateRepository';

@injectable()
export class SearchAllTemplatesUseCase {
  constructor(
    @inject(DiRepository.template)
    private readonly repository: TemplateRepository
  ) {}

  run(accountId: string): Promise<Array<Template>> {
    return this.repository.searchAll(new AccountId(accountId));
  }
}
