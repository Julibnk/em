import { DomainError } from '../../../Shared/domain/DomainError';
import { AccountPhone } from '../AccountPhone';

export class AccountPhonePersistenceError extends DomainError {
  constructor(accountPhone: AccountPhone) {
    super(
      `Account phone ${accountPhone.phone.prefix.value}${accountPhone.phone.number.value} could not be saved`
    );
  }
}
