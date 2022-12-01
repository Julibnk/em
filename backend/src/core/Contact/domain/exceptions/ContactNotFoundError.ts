import { DomainError } from '../../../Shared/domain/DomainError';
import { ContactId } from '../value-object/ContactId';

export class ContactNotFoundError extends DomainError {
  constructor(id: ContactId) {
    super(`Contact ${id.value} not found`);
  }
}
