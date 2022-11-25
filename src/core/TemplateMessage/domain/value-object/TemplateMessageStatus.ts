import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export enum TemplateMessageStatuses {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  SCHEDULED = 'SCHEDULED',
  ERROR = 'ERROR',
}

export class TemplateMessageStatus extends EnumValueObject<TemplateMessageStatuses> {
  constructor(value: TemplateMessageStatuses) {
    super(value, Object.values(TemplateMessageStatuses));
  }

  static fromValue(value: string): TemplateMessageStatus {
    switch (value) {
      case TemplateMessageStatuses.DRAFT:
        return new TemplateMessageStatus(TemplateMessageStatuses.DRAFT);
      case TemplateMessageStatuses.SENT:
        return new TemplateMessageStatus(TemplateMessageStatuses.SENT);
      case TemplateMessageStatuses.SCHEDULED:
        return new TemplateMessageStatus(TemplateMessageStatuses.SCHEDULED);
      case TemplateMessageStatuses.ERROR:
        return new TemplateMessageStatus(TemplateMessageStatuses.ERROR);
      default:
        throw new InvalidArgumentError(
          `The template message status ${value} is invalid`
        );
    }
  }

  protected throwErrorForInvalidValue(value: TemplateMessageStatuses): void {
    throw new InvalidArgumentError(
      `The template message status type ${value} is invalid`
    );
  }
}
