import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { CategoryId } from './value-object/CategoryId';
import { CategoryName } from './value-object/CategoryName';
import { CategoryShortDescription } from './value-object/CategoryShortDescription';
import { Primitives } from '../../Shared/domain/Primitives';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export class Category extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: CategoryId,
    private _name: CategoryName,
    private _shortDescription: CategoryShortDescription,
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

  public get shortDescription(): CategoryShortDescription {
    return this._shortDescription;
  }

  public get templateIds(): Array<TemplateId> {
    return this._templateIds;
  }

  change(name: CategoryName, shortDescription: CategoryShortDescription): void {
    this._name = name;
    this._shortDescription = shortDescription;
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
      shortDescription: this.shortDescription.value,
      templateIds: this.templateIds.map((templateId) => templateId.value),
    };
  }

  static create(
    accountId: AccountId,
    id: CategoryId,
    name: CategoryName,
    shortDescription: CategoryShortDescription,
    templateIds: Array<TemplateId>
  ): Category {
    return new Category(accountId, id, name, shortDescription, templateIds);
  }

  static fromPrimitives(plainData: Primitives<Category>): Category {
    return new Category(
      new AccountId(plainData.accountId),
      new CategoryId(plainData.id),
      new CategoryName(plainData.name),
      new CategoryShortDescription(plainData.shortDescription),
      plainData.templateIds.map((templateId) => new TemplateId(templateId))
    );
  }
}
