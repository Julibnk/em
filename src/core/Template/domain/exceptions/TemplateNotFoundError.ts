import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateId } from '../value-object/TemplateId';

export class TemplateNotFoundError extends DomainError {
  constructor(id: TemplateId) {
    super(`Template ${id.value} not found`);
  }
}
