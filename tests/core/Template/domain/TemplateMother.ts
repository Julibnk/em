import { Template } from '../../../../src/core/Template/domain/Template';
import { TemplateIdMother } from './TemplateIdMother';
import { TemplateNameMother } from './TemplateNameMother';
import { TemplateStatusMother } from './TemplateStatusMother';
import { TemplateShortDescriptionMother } from './TemplateShortDescriptionMother';
import { TemplatePreviewMother } from './TemplatePreviewMother';
import { TemplateVariableMother } from './TemplateVariableMother';
import { TemplateId } from '../../../../src/core/Template/domain/TemplateId';
import { TemplateStatus } from '../../../../src/core/Template/domain/TemplateStatus';
import { TemplateName } from '../../../../src/core/Template/domain/TemplateName';
import { TemplateShortDescription } from '../../../../src/core/Template/domain/TemplateShortDescription';
import { TemplatePreview } from '../../../../src/core/Template/domain/TemplatePreview';
import { TemplateVariable } from '../../../../src/core/Template/domain/TemplateVariable';

export class TemplateMother {
  static create(
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
}
