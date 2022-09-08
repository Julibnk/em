import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateId } from './TemplateId';
import { TemplateName } from './TemplateName';
import { TemplateStatus } from './TemplateStatus';
import { TemplateShortDescription } from './TemplateShortDescription';
import { TemplatePreview } from './TemplatePreview';
import { BoolValueObject } from '../../Shared/domain/value-object/BoolValueObject';
import { TemplateVariable } from './TemplateVariable';
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class Template extends AggregateRoot {
  constructor(
    readonly id: TemplateId,
    readonly name: TemplateName,
    readonly status: TemplateStatus,
    readonly shortDescription: TemplateShortDescription,
    readonly preview: TemplatePreview,
    readonly hasVariable1: BoolValueObject,
    readonly hasVariable2: BoolValueObject,
    readonly hasVariable3: BoolValueObject,
    readonly variable1: TemplateVariable,
    readonly variable2: TemplateVariable,
    readonly variable3: TemplateVariable
  ) {
    super();
    this.ensureVariable3Consistence();
    this.ensureVariable2Consistence();
    this.ensureVariable1Consistence();
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    status: string;
    shortDescription: string;
    preview: string;
    hasVariable1: boolean;
    hasVariable2: boolean;
    hasVariable3: boolean;
    variable1: string;
    variable2: string;
    variable3: string;
  }): Template {
    return new Template(
      new TemplateId(plainData.id),
      new TemplateName(plainData.name),
      TemplateStatus.fromValue(plainData.status),
      new TemplateShortDescription(plainData.shortDescription),
      new TemplatePreview(plainData.preview),
      new BoolValueObject(plainData.hasVariable1),
      new BoolValueObject(plainData.hasVariable2),
      new BoolValueObject(plainData.hasVariable3),
      new TemplateVariable(plainData.variable1),
      new TemplateVariable(plainData.variable2),
      new TemplateVariable(plainData.variable3)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      shortDescription: this.shortDescription,
      preview: this.preview,
      hasVariable1: this.hasVariable1,
      hasVariable2: this.hasVariable2,
      hasVariable3: this.hasVariable3,
      variable1: this.variable1,
      variable2: this.variable2,
      variable3: this.variable3,
    };
  }

  private ensureVariable3Consistence() {
    if (this.hasVariable3.value) {
      if (!this.hasVariable2.value || !this.hasVariable1.value)
        throw InvalidArgumentError;

      if (!this.variable3.value) throw InvalidArgumentError;
    }
  }

  private ensureVariable2Consistence() {
    if (this.hasVariable2.value) {
      if (!this.hasVariable1.value) throw InvalidArgumentError;

      if (!this.variable2.value) throw InvalidArgumentError;
    }
  }

  private ensureVariable1Consistence() {
    if (this.hasVariable1.value && !this.variable1.value)
      throw InvalidArgumentError;
  }
}
