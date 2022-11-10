import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { CategoryId } from './value-object/CategoryId';
import { CategoryName } from './value-object/CategoryName';
import { CategoryDescription } from './value-object/CategoryDescription';
import { Primitives } from '../../Shared/domain/Primitives';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export class Category extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: CategoryId,
    private _name: CategoryName,
    private _description: CategoryDescription,
    private _templateIds: Array<TemplateId>
  ) {
    super();
    this.ensureUniqueTemplateId();
  }

  private ensureUniqueTemplateId(): void {
    // new Set().add()
    // this._templateIds = new Map(this._templateIds.map((item) => [item.value, item])).values();
  }
  public get name(): CategoryName {
    return this._name;
  }

  public get description(): CategoryDescription {
    return this._description;
  }

  public get templateIds(): Array<TemplateId> {
    return this._templateIds;
  }

  change(name: CategoryName, description: CategoryDescription): void {
    this._name = name;
    this._description = description;
  }

  assignTemplate(templateId: TemplateId): void {
    this._templateIds.push(templateId);
    this.ensureUniqueTemplateId();
  }

  removeTemplate(templateId: TemplateId): void {
    this._templateIds = this._templateIds.filter(
      (id) => id.value !== templateId.value
    );
  }

  toPrimitives(): Primitives<Category> {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      templateIds: this.templateIds.map((templateId) => templateId.value),
    };
  }

  static create(
    accountId: AccountId,
    id: CategoryId,
    name: CategoryName,
    description: CategoryDescription,
    templateIds: Array<TemplateId>
  ): Category {
    return new Category(accountId, id, name, description, templateIds);
  }

  static fromPrimitives(plainData: Primitives<Category>): Category {
    return new Category(
      new AccountId(plainData.accountId),
      new CategoryId(plainData.id),
      new CategoryName(plainData.name),
      new CategoryDescription(plainData.description),
      plainData.templateIds.map((templateId) => new TemplateId(templateId))
    );
  }
}
