import {
  TemplateMessageStatus,
  TemplateMessageStatuses,
} from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageStatus';
import { EnumMother } from '../../Shared/domain/EnumMother';
export class TemplateMessageStatusMother {
  static create(value: TemplateMessageStatuses): TemplateMessageStatus {
    return new TemplateMessageStatus(value);
  }

  static random(): TemplateMessageStatus {
    return this.create(
      EnumMother.create<TemplateMessageStatuses>(
        Object.values(TemplateMessageStatuses)
      )
    );
  }
}
