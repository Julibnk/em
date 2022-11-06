import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateId } from '../domain/value-object/TemplateId';

export class TemplateNotFoundError extends Error {
  constructor(accountId: AccountId, id: TemplateId) {
    super(`Template ${id.value} not found for account ${accountId.value}`);
  }
}
