import { MessageSentDate } from '../../../../src/core/TemplateMessage/domain/value-object/MessageSentDate';
import { DateMother } from '../../Shared/domain/DateMother';
export class MessageSentDateMother {
  static create(value: Date): MessageSentDate {
    return new MessageSentDate(value);
  }

  static random(): MessageSentDate {
    return this.create(DateMother.random());
  }
}
