import { DomainError } from '../../../Shared/domain/DomainError';
import { Contact } from '../Contact';

export class InconsistentContactError extends DomainError {
  constructor(contact: Contact) {
    super(
      `Inconsistent contact with phone  ${contact.phone.prefix.value}${contact.phone.number.value}`
    );
  }
}
