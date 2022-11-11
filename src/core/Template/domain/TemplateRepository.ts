import { TemplateId } from './value-object/TemplateId';
import { Template } from './Template';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateName } from './value-object/TemplateName';
import { Nullable } from '../../Shared/domain/Nullable';

export interface TemplateRepository {
  save(template: Template): Promise<void>;

  searchAll(accountId: AccountId): Promise<Array<Template>>;

  searchByName(
    accountId: AccountId,
    name: TemplateName
  ): Promise<Nullable<Template>>;

  findById(accountId: AccountId, id: TemplateId): Promise<Template>;
}
