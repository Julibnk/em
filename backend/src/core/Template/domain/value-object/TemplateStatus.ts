import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export enum TemplateStatuses {
  NOT_SENT = 'NOT_SENT',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR',
}

export class TemplateStatus extends EnumValueObject<TemplateStatuses> {
  constructor(value: TemplateStatuses) {
    super(value, Object.values(TemplateStatuses));
  }

  static fromValue(value: string): TemplateStatus {
    switch (value) {
      case TemplateStatuses.NOT_SENT:
        return new TemplateStatus(TemplateStatuses.NOT_SENT);
      case TemplateStatuses.ACTIVE:
        return new TemplateStatus(TemplateStatuses.ACTIVE);
      case TemplateStatuses.ERROR:
        return new TemplateStatus(TemplateStatuses.ERROR);
      default:
        throw new InvalidArgumentError(
          `The template status ${value} is invalid`
        );
    }
  }

  protected throwErrorForInvalidValue(value: TemplateStatuses): void {
    throw new InvalidArgumentError(
      `The template status type ${value} is invalid`
    );
  }
}
