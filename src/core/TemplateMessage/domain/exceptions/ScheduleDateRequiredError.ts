import { DomainError } from '../../../Shared/domain/DomainError';

export class ScheduleDateRequiredError extends DomainError {
  constructor() {
    super(`Shcedule date needed`);
  }
}
