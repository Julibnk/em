import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateMessageId } from '../value-object/TemplateMessageId';

export class TemplateMessageNotFoundError extends DomainError {
  constructor(id: TemplateMessageId) {
    super(`Template message with id ${id.value} not found`);
  }
}
