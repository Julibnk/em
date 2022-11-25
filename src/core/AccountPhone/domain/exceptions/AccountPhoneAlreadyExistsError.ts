import { DomainError } from '../../../Shared/domain/DomainError';
import { Phone } from '../../../Shared/domain/Phone/Phone';

export class AccountPhoneAlreadyExistsError extends DomainError {
  constructor(phone: Phone) {
    super(
      `Account phone ${phone.prefix.value} ${phone.number.value} already exists`
    );
  }
}
