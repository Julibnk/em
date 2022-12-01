import { Template } from '../Template';
import { DomainError } from '../../../Shared/domain/DomainError';

export class TemplatePersistenceError extends DomainError {
  constructor(template: Template) {
    super(`Template ${template.name} could not be saved`);
  }
}
