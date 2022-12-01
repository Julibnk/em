import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateMessageId } from '../value-object/TemplateMessageId';
import { TemplateMessageStatus } from '../value-object/TemplateMessageStatus';

export class TemplateMessageStatusError extends DomainError {
  constructor(id: TemplateMessageId, status: TemplateMessageStatus) {
    super(`Status ${status.value} invalid for template message ${id.value} `);
  }
}
