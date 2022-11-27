import { TemplateMessageScheduleDate } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageScheduleDate';
import { DateMother } from '../../Shared/domain/DateMother';

export class TemplateMessageScheduleDateMother {
  static create(value: Date): TemplateMessageScheduleDate {
    return new TemplateMessageScheduleDate(value);
  }
  static random(): TemplateMessageScheduleDate {
    return this.create(DateMother.random());
  }
}
