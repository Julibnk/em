import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { TemplateName } from '../value-object/TemplateName';

export class TemplateWithSameNameAlreadyExistsError extends Error {
  constructor(accountId: AccountId, name: TemplateName) {
    super(
      `Template with name ${name.value} already exists for account ${accountId.value}`
    );
  }
}
