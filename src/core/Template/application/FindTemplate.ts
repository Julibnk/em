import { Template } from '../domain/Template';
import { TemplateId } from '../domain/value-object/TemplateId';
import { TemplateRepository } from '../domain/TemplateRepository';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { inject, injectable } from 'inversify';
import { DIDomain } from '../../Shared/dependency-injection';
import { TemplateNotFoundError } from '../domain/exceptions/TemplateNotFoundError';
@injectable()
export class FindTemplateUseCase {
  constructor(
    @inject(DIDomain.template) private readonly repository: TemplateRepository
  ) {}

  async run(accountId: string, id: string): Promise<Template> {
    const template = await this.repository.findById(
      new AccountId(accountId),
      new TemplateId(id)
    );

    if (!template) {
      throw new TemplateNotFoundError(new TemplateId(id));
    }

    return template;
  }
}
