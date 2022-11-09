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
import { TemplateWithSameNameAlreadyExistsError } from '../domain/exceptions/TemplateWithSameNameAlreadyExistsError';

// Este caso de uso se encarga de crear plantillas,
// - En caso de que la plantilla ya exista se actualiza
// - En caso de que la plantilla no exista se crea
// - En caso de que exista una plantilla con el mismo nombre se lanza una excepción

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
export class CreateTemplateUseCase {
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
    let template: Template;

    try {
      template = await this.repository.findById(
        new AccountId(accountId),
        new TemplateId(id)
      );

      template.change(
        new TemplateShortDescription(shortDescription),
        new TemplatePreview(preview),
        new TemplateVariable(variable1),
        new TemplateVariable(variable2),
        new TemplateVariable(variable3)
      );
    } catch (e) {
      template = Template.create(
        new AccountId(accountId),
        new TemplateId(id),
        new TemplateName(name),
        new TemplateShortDescription(shortDescription),
        new TemplatePreview(preview),
        new TemplateVariable(variable1),
        new TemplateVariable(variable2),
        new TemplateVariable(variable3)
      );

      const templateWithSameName = await this.repository.searchByName(
        template.accountId,
        template.name
      );

      if (templateWithSameName) {
        throw new TemplateWithSameNameAlreadyExistsError(
          template.accountId,
          template.name
        );
      }
    }

    await this.repository.save(template);
  }
}
