import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateMessageId } from './value-object/TemplateMessageId';
import { TemplateMessageStatus } from './value-object/TemplateMessageStatus';
import { MessageSentDate } from './value-object/MessageSentDate';
import { TemplateMessageScheduleDate } from './value-object/TemplateMessageScheduleDate';
import { TemplateMessageParameter } from './value-object/TemplateMessageParameter';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { ContactId } from '../../Contact/domain/value-object/ContactId';
import { AccountPhoneId } from '../../AccountPhone/domain/value-object/AccountPhoneId';
import { Primitives } from '../../Shared/domain/Primitives';

export type TemplateMessagePrimitives = Omit<
  Primitives<TemplateMessage>,
  'status'
> & {
  status: string;
};

export class TemplateMessage extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: TemplateMessageId,
    private _status: TemplateMessageStatus,
    private _sentDate: MessageSentDate,
    private _scheduleDate: TemplateMessageScheduleDate,
    private _parameter1: TemplateMessageParameter,
    private _parameter2: TemplateMessageParameter,
    private _parameter3: TemplateMessageParameter,
    private _templateId: TemplateId,
    private _accountPhoneId: AccountPhoneId,
    private _contactId: ContactId
  ) {
    super();
  }

  static fromPrimitives(
    primitives: TemplateMessagePrimitives
  ): TemplateMessage {
    return new TemplateMessage(
      new AccountId(primitives.accountId),
      new TemplateMessageId(primitives.id),
      TemplateMessageStatus.fromValue(primitives.status),
      new MessageSentDate(primitives.sentDate),
      new TemplateMessageScheduleDate(primitives.scheduleDate),
      new TemplateMessageParameter(primitives.parameter1),
      new TemplateMessageParameter(primitives.parameter2),
      new TemplateMessageParameter(primitives.parameter3),
      new TemplateId(primitives.templateId),
      new AccountPhoneId(primitives.accountPhoneId),
      new ContactId(primitives.contactId)
    );
  }

  toPrimitives(): TemplateMessagePrimitives {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      status: this._status.value,
      sentDate: this._sentDate.value,
      scheduleDate: this._scheduleDate.value,
      parameter1: this._parameter1.value,
      parameter2: this._parameter2.value,
      parameter3: this._parameter3.value,
      templateId: this._templateId.value,
      accountPhoneId: this._accountPhoneId.value,
      contactId: this._contactId.value,
    };
  }

  get status(): TemplateMessageStatus {
    return this._status;
  }

  get sentDate(): MessageSentDate {
    return this._sentDate;
  }

  get scheduleDate(): TemplateMessageScheduleDate {
    return this._scheduleDate;
  }

  get parameter1(): TemplateMessageParameter {
    return this._parameter1;
  }

  get parameter2(): TemplateMessageParameter {
    return this._parameter2;
  }

  get parameter3(): TemplateMessageParameter {
    return this._parameter3;
  }

  get templateId(): TemplateId {
    return this._templateId;
  }

  get accountPhoneId(): AccountPhoneId {
    return this._accountPhoneId;
  }

  get contactId(): ContactId {
    return this._contactId;
  }
}
