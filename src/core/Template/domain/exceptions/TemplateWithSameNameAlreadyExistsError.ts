import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { TemplateName } from '../value-object/TemplateName';
import { DomainError } from '../../../Shared/domain/DomainError';

export class TemplateWithSameNameAlreadyExistsError extends DomainError {
  constructor(accountId: AccountId, name: TemplateName) {
    super(
      `Template with name ${name.value} already exists for account ${accountId.value}`
    );
  }
}
