import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { inject, injectable } from 'inversify';
import { DIDomain } from '../../Shared/dependency-injection';
import { TemplateId } from '../domain/value-object/TemplateId';
import { TemplateName } from '../domain/value-object/TemplateName';
import { TemplateShortDescription } from '../domain/value-object/TemplateShortDescription';
import { TemplateVariable } from '../domain/value-object/TemplateVariable';
import { TemplatePreview } from '../domain/value-object/TemplatePreview';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateWithSameNameAlreadyExistsError } from '../domain/exceptions/TemplateWithSameNameAlreadyExistsError';
import { TemplateNotFoundError } from '../domain/exceptions/TemplateNotFoundError';

export type Params = {
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
export class SaveTemplateUseCase {
  constructor(
    @inject(DIDomain.template)
    private repository: TemplateRepository
  ) {}

  async run(params: Params): Promise<void> {
    let template: Template;

    const accountId = new AccountId(params.accountId);
    const id = new TemplateId(params.id);
    const name = new TemplateName(params.name);
    const shortDescription = new TemplateShortDescription(
      params.shortDescription
    );
    const preview = new TemplatePreview(params.preview);
    const variable1 = new TemplateVariable(params.variable1);
    const variable2 = new TemplateVariable(params.variable2);
    const variable3 = new TemplateVariable(params.variable3);

    try {
      template = await this.repository.findById(accountId, id);

      template.change(
        shortDescription,
        preview,
        variable1,
        variable2,
        variable3
      );
    } catch (error) {
      if (error instanceof TemplateNotFoundError) {
        const templateWithSameName = await this.repository.searchByName(
          accountId,
          name
        );

        if (templateWithSameName) {
          throw new TemplateWithSameNameAlreadyExistsError(name);
        }

        template = Template.create(
          accountId,
          id,
          name,
          shortDescription,
          preview,
          variable1,
          variable2,
          variable3
        );
      } else {
        throw error;
      }
    }

    this.repository.save(template);
  }
}
