import { TemplateRepository } from '../domain/TemplateRepository';
import { Template } from '../domain/Template';
import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { TemplateId } from '../domain/value-object/TemplateId';
import { TemplateName } from '../domain/value-object/TemplateName';
import { TemplateDescription } from '../domain/value-object/TemplateDescription';
import { TemplateVariable } from '../domain/value-object/TemplateVariable';
import { TemplatePreview } from '../domain/value-object/TemplatePreview';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateWithSameNameAlreadyExistsError } from '../domain/exceptions/TemplateWithSameNameAlreadyExistsError';

export type Params = {
  accountId: string;
  id: string;
  name: string;
  description: string;
  preview: string;
  variable1: string;
  variable2: string;
  variable3: string;
};

@injectable()
export class SaveTemplateUseCase {
  constructor(
    @inject(DiRepository.template)
    private repository: TemplateRepository
  ) {}

  async run(params: Params): Promise<void> {
    const accountId = new AccountId(params.accountId);
    const id = new TemplateId(params.id);
    const name = new TemplateName(params.name);
    const description = new TemplateDescription(params.description);
    const preview = new TemplatePreview(params.preview);
    const variable1 = new TemplateVariable(params.variable1);
    const variable2 = new TemplateVariable(params.variable2);
    const variable3 = new TemplateVariable(params.variable3);

    let template = await this.repository.findById(accountId, id);

    if (template) {
      template.change(description, preview, variable1, variable2, variable3);
    } else {
      const templateWithSameName = await this.repository.findByName(
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
        description,
        preview,
        variable1,
        variable2,
        variable3
      );
    }

    this.repository.save(template);
  }
}
