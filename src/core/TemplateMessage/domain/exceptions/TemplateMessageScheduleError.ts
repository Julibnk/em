import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateMessageId } from '../value-object/TemplateMessageId';

export class TemplateMessageScheduleError extends DomainError {
  constructor(id: TemplateMessageId) {
    super(`Missing schedule date for template message ${id.value}`);
  }
}
