import { AccountId } from '../../../Account/domain/value-object/AccountId';
import { DomainError } from '../../../Shared/domain/DomainError';
// import { TemplateId } from '../value-object/TemplateId';
import { ContactId } from '../value-object/ContactId';

export class ContactNotFoundError extends DomainError {
  constructor(id: ContactId) {
    super(`Contact ${id.value} not found`);
  }
}
