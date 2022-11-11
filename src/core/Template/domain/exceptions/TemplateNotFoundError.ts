import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateId } from '../value-object/TemplateId';

export class TemplateNotFoundError extends DomainError {
  constructor(accountId: AccountId, id: TemplateId) {
    super(`Template ${id.value} not found for account ${accountId.value}`);
  }
}
