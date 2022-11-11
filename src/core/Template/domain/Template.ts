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

// Override primitives type to avoid Enum type checking
export type TemplatePrimitives = Omit<Primitives<Template>, 'status'> & {
  status: string;
};

export class Template extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: TemplateId,
    readonly name: TemplateName,
    private _status: TemplateStatus,
    private _shortDescription: TemplateShortDescription,
    private _preview: TemplatePreview,
    private _variable1: TemplateVariable,
    private _variable2: TemplateVariable,
    private _variable3: TemplateVariable
  ) {
    super();
    this.ensureVariableConsistence();
  }

  public get status(): TemplateStatus {
    return this._status;
  }
  public get shortDescription(): TemplateShortDescription {
    return this._shortDescription;
  }
  public get preview(): TemplatePreview {
    return this._preview;
  }
  public get variable1(): TemplateVariable {
    return this._variable1;
  }
  public get variable2(): TemplateVariable {
    return this._variable2;
  }
  public get variable3(): TemplateVariable {
    return this._variable3;
  }

  static fromPrimitives(plainData: TemplatePrimitives): Template {
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

  change(
    shortDescription: TemplateShortDescription,
    preview: TemplatePreview,
    variable1: TemplateVariable,
    variable2: TemplateVariable,
    variable3: TemplateVariable
  ): void {
    this._shortDescription = shortDescription;
    this._preview = preview;
    this._variable1 = variable1;
    this._variable2 = variable2;
    this._variable3 = variable3;

    this.ensureVariableConsistence();
  }

  changeStatus(status: TemplateStatus): void {
    this._status = status;
  }

  toPrimitives(): TemplatePrimitives {
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
