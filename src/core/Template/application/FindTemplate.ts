import { Template } from '../domain/Template';
import { TemplateId } from '../domain/value-object/TemplateId';
import { TemplateRepository } from '../domain/TemplateRepository';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { inject, injectable } from 'inversify';
import { DIDomain } from '../../Shared/dependency-injection';
@injectable()
export class FindTemplateUseCase {
  constructor(
    @inject(DIDomain.template) private readonly repository: TemplateRepository
  ) {}

  run(accountId: string, id: string): Promise<Template> {
    return this.repository.findById(
      new AccountId(accountId),
      new TemplateId(id)
    );
  }
}
