import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateMessageId } from '../value-object/TemplateMessageId';

export class TemplateMessageParameterInconsistentError extends DomainError {
  constructor(id: TemplateMessageId) {
    super(`Parameters for template message ${id.value} are inconsisntet`);
  }
}
