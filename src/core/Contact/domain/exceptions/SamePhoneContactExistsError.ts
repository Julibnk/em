import { DomainError } from '../../../Shared/domain/DomainError';
import { Phone } from '../../../Shared/domain/Phone/Phone';

export class SamePhoneContactExistsError extends DomainError {
  constructor(phone: Phone) {
    super(`Contact with phone ${phone.prefix.value}${phone.number.value}`);
  }
}
