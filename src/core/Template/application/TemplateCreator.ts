import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { inject, injectable } from 'inversify';
import { DIRepository } from '../../Shared/dependency-injection';
import { TemplateId } from '../domain/value-object/TemplateId';
import { TemplateName } from '../domain/value-object/TemplateName';
import { TemplateShortDescription } from '../domain/value-object/TemplateShortDescription';
import { TemplateVariable } from '../domain/value-object/TemplateVariable';
import { TemplatePreview } from '../domain/value-object/TemplatePreview';
import { AccountId } from '../../Account/domain/value-object/AccountId';

type Params = {
  accountId: string;
  id: string;
  name: string;
  shortDescription: string;
  preview: string;
  variable1: string;
  variable2: string;
  variable3: string;
};

@injectable()
export class TemplateCreator {
  constructor(
    @inject(DIRepository.template)
    private repository: TemplateRepository
  ) {}

  async run({
    accountId,
    id,
    name,
    shortDescription,
    preview,
    variable1,
    variable2,
    variable3,
  }: Params): Promise<void> {
    const template = Template.create(
      new AccountId(accountId),
      new TemplateId(id),
      new TemplateName(name),
      new TemplateShortDescription(shortDescription),
      new TemplatePreview(preview),
      new TemplateVariable(variable1),
      new TemplateVariable(variable2),
      new TemplateVariable(variable3)
    );
    await this.repository.save(template);
  }
}
