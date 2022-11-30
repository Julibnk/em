import { DomainError } from '../../../Shared/domain/DomainError';

export class InconsistentTemplateVariableError extends DomainError {
  constructor() {
    super('Variables are inconsistent');
  }
}
