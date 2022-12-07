import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateIdMother } from './TemplateIdMother';
import { TemplateNameMother } from './TemplateNameMother';
import { TemplateStatusMother } from './TemplateStatusMother';
import { TemplateDescriptionMother } from './TemplateDescriptionMother';
import { TemplatePreviewMother } from './TemplatePreviewMother';
import { TemplateVariableMother } from './TemplateVariableMother';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateStatus } from '../../../../src/core/Template/domain/value-object/TemplateStatus';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';
import { TemplateDescription } from '../../../../src/core/Template/domain/value-object/TemplateDescription';
import { TemplatePreview } from '../../../../src/core/Template/domain/value-object/TemplatePreview';
import { TemplateVariable } from '../../../../src/core/Template/domain/value-object/TemplateVariable';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';

export class TemplateMother {
  static create(
    accountId: AccountId,
    id: TemplateId,
    name: TemplateName,
    status: TemplateStatus,
    description: TemplateDescription,
    preview: TemplatePreview,
    variable1: TemplateVariable,
    variable2: TemplateVariable,
    variable3: TemplateVariable
  ): Template {
    return new Template(
      accountId,
      id,
      name,
      status,
      description,
      preview,
      variable1,
      variable2,
      variable3
    );
  }

  static random(): Template {
    return this.create(
      AccountIdMother.random(),
      TemplateIdMother.random(),
      TemplateNameMother.random(),
      TemplateStatusMother.random(),
      TemplateDescriptionMother.random(),
      TemplatePreviewMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random()
    );
  }

  static makeCopy(template: Template): Template {
    return this.create(
      template.accountId,
      template.id,
      template.name,
      template.status,
      template.description,
      template.preview,
      template.variable1,
      template.variable2,
      template.variable3
    );
  }

  static initialState(accountId?: AccountId): Template {
    return Template.create(
      accountId || AccountIdMother.random(),
      TemplateIdMother.random(),
      TemplateNameMother.random(),
      TemplateDescriptionMother.random(),
      TemplatePreviewMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random()
    );
  }

  static withAccount(accountId: AccountId): Template {
    return Template.create(
      accountId,
      TemplateIdMother.random(),
      TemplateNameMother.random(),
      TemplateDescriptionMother.random(),
      TemplatePreviewMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random()
    );
  }
}
