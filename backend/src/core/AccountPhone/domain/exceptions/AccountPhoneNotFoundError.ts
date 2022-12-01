import { DomainError } from '../../../Shared/domain/DomainError';
import { AccountPhoneId } from '../value-object/AccountPhoneId';

export class AccountPhoneNotFoundError extends DomainError {
  constructor(id: AccountPhoneId) {
    super(`Account phone ${id.value} not found`);
  }
}
