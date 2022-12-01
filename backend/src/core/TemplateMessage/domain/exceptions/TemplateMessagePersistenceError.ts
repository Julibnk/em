import { DomainError } from '../../../Shared/domain/DomainError';
import { TemplateMessage } from '../TemplateMessage';
export class TemplateMessagePersistenceError extends DomainError {
  constructor(templateMessage: TemplateMessage) {
    super(
      `Template message with id ${templateMessage.id.value} could not be saved`
    );
  }
}
