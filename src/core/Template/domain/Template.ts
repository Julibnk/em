import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateId } from './value-object/TemplateId';
import { TemplateName } from './value-object/TemplateName';
import {
  TemplateStatus,
  TemplateStatuses,
} from './value-object/TemplateStatus';
import { TemplateShortDescription } from './value-object/TemplateShortDescription';
import { TemplatePreview } from './value-object/TemplatePreview';
import { TemplateVariable } from './value-object/TemplateVariable';
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';
import { Primitives } from '../../Shared/domain/Primitives';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export class Template extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: TemplateId,
    readonly name: TemplateName,
    readonly status: TemplateStatus,
    readonly shortDescription: TemplateShortDescription,
    readonly preview: TemplatePreview,
    readonly variable1: TemplateVariable,
    readonly variable2: TemplateVariable,
    readonly variable3: TemplateVariable
  ) {
    super();
    this.ensureVariableConsistence();
  }

  static fromPrimitives(plainData: Primitives<Template>): Template {
    return new Template(
      new AccountId(plainData.accountId),
      new TemplateId(plainData.id),
      new TemplateName(plainData.name),
      TemplateStatus.fromValue(plainData.status),
      new TemplateShortDescription(plainData.shortDescription),
      new TemplatePreview(plainData.preview),
      new TemplateVariable(plainData.variable1),
      new TemplateVariable(plainData.variable2),
      new TemplateVariable(plainData.variable3)
    );
  }

  // New template is created with status NOT_SENT
  static create(
    accountId: AccountId,
    id: TemplateId,
    name: TemplateName,
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
      TemplateStatus.fromValue(TemplateStatuses.NOT_SENT),
      shortDescription,
      preview,
      variable1,
      variable2,
      variable3
    );
  }

  toPrimitives(): Primitives<Template> {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      name: this.name.value,
      status: this.status.value,
      shortDescription: this.shortDescription.value,
      preview: this.preview.value,
      variable1: this.variable1.value,
      variable2: this.variable2.value,
      variable3: this.variable3.value,
    };
  }

  private ensureVariableConsistence() {
    this.ensureVariable3Consistence();
    this.ensureVariable2Consistence();
  }

  private ensureVariable3Consistence() {
    if (this.variable3.value) {
      if (!this.variable2.value || !this.variable1.value)
        throw InvalidArgumentError;
    }
  }

  private ensureVariable2Consistence() {
    if (this.variable2.value) {
      if (!this.variable1.value) throw InvalidArgumentError;
    }
  }
}
