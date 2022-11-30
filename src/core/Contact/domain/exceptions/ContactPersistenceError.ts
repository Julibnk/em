import { DomainError } from '../../../Shared/domain/DomainError';
import { Contact } from '../Contact';

export class ContactPersistenceError extends DomainError {
  constructor(contact: Contact) {
    super(
      `Contact ${contact.name.value} with phone ${contact.phone.prefix.value}${contact.phone.number.value} could not be saved`
    );
  }
}
