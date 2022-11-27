import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateIdMother } from './TemplateIdMother';
import { TemplateNameMother } from './TemplateNameMother';
import { TemplateStatusMother } from './TemplateStatusMother';
import { TemplateShortDescriptionMother } from './TemplateShortDescriptionMother';
import { TemplatePreviewMother } from './TemplatePreviewMother';
import { TemplateVariableMother } from './TemplateVariableMother';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { TemplateStatus } from '../../../../src/core/Template/domain/value-object/TemplateStatus';
import { TemplateName } from '../../../../src/core/Template/domain/value-object/TemplateName';
import { TemplateShortDescription } from '../../../../src/core/Template/domain/value-object/TemplateShortDescription';
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
    shortDescription: TemplateShortDescription,
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
      shortDescription,
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
      TemplateShortDescriptionMother.random(),
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
      template.shortDescription,
      template.preview,
      template.variable1,
      template.variable2,
      template.variable3
    );
  }

  static initialState(accountId?: AccountId): Template {
    return this.create(
      accountId || AccountIdMother.random(),
      TemplateIdMother.random(),
      TemplateNameMother.random(),
      TemplateShortDescriptionMother.random(),
      TemplatePreviewMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random()
    );
  }

  static withName(name: TemplateName): Template {
    return Template.create(
      AccountIdMother.random(),
      TemplateIdMother.random(),
      name,
      TemplateShortDescriptionMother.random(),
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
      TemplateShortDescriptionMother.random(),
      TemplatePreviewMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random(),
      TemplateVariableMother.random()
    );
  }
}
