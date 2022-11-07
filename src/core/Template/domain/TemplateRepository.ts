import { TemplateId } from './value-object/TemplateId';
import { Template } from './Template';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export interface TemplateRepository {
  save(template: Template): Promise<void>;
  searchAll(accountId: AccountId): Promise<Array<Template>>;
  findById(accountId: AccountId, id: TemplateId): Promise<Template>;
}
