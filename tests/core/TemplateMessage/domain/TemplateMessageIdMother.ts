import { TemplateMessageId } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageId';
import { UuidMother } from '../../Shared/domain/UuidMother';
export class TemplateMessageIdMother {
  static create(value: string): TemplateMessageId {
    return new TemplateMessageId(value);
  }

  static random(): TemplateMessageId {
    return this.create(UuidMother.random());
  }
}
