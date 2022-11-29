import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { TemplateMessageId } from './value-object/TemplateMessageId';
import {
  TemplateMessageStatus,
  TemplateMessageStatuses,
} from './value-object/TemplateMessageStatus';
import { MessageSentDate } from './value-object/MessageSentDate';
import { TemplateMessageScheduleDate } from './value-object/TemplateMessageScheduleDate';
import { TemplateMessageParameter } from './value-object/TemplateMessageParameter';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { ContactId } from '../../Contact/domain/value-object/ContactId';
import { AccountPhoneId } from '../../AccountPhone/domain/value-object/AccountPhoneId';
import { Primitives } from '../../Shared/domain/Primitives';
import { TemplateMessageParameterInconsistentError } from './exceptions/TemplateMessageParameterInconsistentError';
import { TemplateMessageScheduleError } from './exceptions/TemplateMessageScheduleError';
import { Nullable } from '../../Shared/domain/Nullable';
import { TemplateMessageStatusError } from './exceptions/TemplateMessageStatusError';

export type TemplateMessagePrimitives = Omit<
  Primitives<TemplateMessage>,
  'status' | 'sentDate' | 'scheduleDate'
> & {
  status: string;
  sentDate: Nullable<Date>;
  scheduleDate: Nullable<Date>;
};

export class TemplateMessage extends AggregateRoot {
  constructor(
    readonly accountId: AccountId,
    readonly id: TemplateMessageId,
    private _status: TemplateMessageStatus,
    private _templateId: TemplateId,
    private _accountPhoneId: AccountPhoneId,
    private _contactId: ContactId,
    private _parameter1: TemplateMessageParameter,
    private _parameter2: TemplateMessageParameter,
    private _parameter3: TemplateMessageParameter,
    private _scheduleDate: Nullable<TemplateMessageScheduleDate>,
    private _sentDate: Nullable<MessageSentDate>
  ) {
    super();
    this.ensureConsistency();
  }

  static fromPrimitives(
    primitives: TemplateMessagePrimitives
  ): TemplateMessage {
    return new TemplateMessage(
      new AccountId(primitives.accountId),
      new TemplateMessageId(primitives.id),
      TemplateMessageStatus.fromValue(primitives.status),
      new TemplateId(primitives.templateId),
      new AccountPhoneId(primitives.accountPhoneId),
      new ContactId(primitives.contactId),
      new TemplateMessageParameter(primitives.parameter1),
      new TemplateMessageParameter(primitives.parameter2),
      new TemplateMessageParameter(primitives.parameter3),
      primitives.scheduleDate &&
        new TemplateMessageScheduleDate(primitives.scheduleDate),
      primitives.sentDate && new MessageSentDate(primitives.sentDate)
    );
  }

  static create(
    accountId: AccountId,
    id: TemplateMessageId,
    status: TemplateMessageStatus,
    templateId: TemplateId,
    accountPhoneId: AccountPhoneId,
    contactId: ContactId,
    parameter1: TemplateMessageParameter,
    parameter2: TemplateMessageParameter,
    parameter3: TemplateMessageParameter,
    scheduleDate: Nullable<TemplateMessageScheduleDate>
  ): TemplateMessage {
    if (
      status.value !== TemplateMessageStatuses.SCHEDULED &&
      status.value !== TemplateMessageStatuses.DRAFT &&
      status.value !== TemplateMessageStatuses.PENDING
    ) {
      throw new TemplateMessageStatusError(id, status);
    }

    const templateMessage = new TemplateMessage(
      accountId,
      id,
      status,
      templateId,
      accountPhoneId,
      contactId,
      parameter1,
      parameter2,
      parameter3,
      scheduleDate,
      null
    );

    return templateMessage;
  }

  change(
    status: TemplateMessageStatus,
    templateId: TemplateId,
    accountPhoneId: AccountPhoneId,
    contactId: ContactId,
    parameter1: TemplateMessageParameter,
    parameter2: TemplateMessageParameter,
    parameter3: TemplateMessageParameter,
    scheduleDate: Nullable<TemplateMessageScheduleDate>
  ) {
    if (
      status.value !== TemplateMessageStatuses.SCHEDULED &&
      status.value !== TemplateMessageStatuses.DRAFT &&
      status.value !== TemplateMessageStatuses.PENDING
    ) {
      throw new TemplateMessageStatusError(this.id, status);
    }

    this._parameter1 = parameter1;
    this._parameter2 = parameter2;
    this._parameter3 = parameter3;
    this._templateId = templateId;
    this._accountPhoneId = accountPhoneId;
    this._contactId = contactId;
    this._scheduleDate = scheduleDate;

    this.ensureConsistency();
  }

  send() {
    this._status = TemplateMessageStatus.fromValue(
      TemplateMessageStatuses.SENT
    );
    this._sentDate = new MessageSentDate(new Date());
  }

  setErrorStatus() {
    this._status = TemplateMessageStatus.fromValue(
      TemplateMessageStatuses.ERROR
    );
  }

  toPrimitives(): TemplateMessagePrimitives {
    return {
      accountId: this.accountId.value,
      id: this.id.value,
      status: this._status.value,
      templateId: this._templateId.value,
      accountPhoneId: this._accountPhoneId.value,
      contactId: this._contactId.value,
      parameter1: this._parameter1?.value,
      parameter2: this._parameter2?.value,
      parameter3: this._parameter3?.value,
      sentDate: this._sentDate?.value,
      scheduleDate: this._scheduleDate?.value,
    };
  }

  private ensureConsistency() {
    this.ensureParameterConsistency();
    this.ensureScheduleConsistency();
  }

  private ensureParameterConsistency() {
    if (this._parameter3) {
      if (!this._parameter2 || !this._parameter1)
        throw new TemplateMessageParameterInconsistentError(this.id);
    }

    if (this._parameter2) {
      if (!this._parameter1)
        throw new TemplateMessageParameterInconsistentError(this.id);
    }
  }

  private ensureScheduleConsistency() {
    if (
      this._status.value === TemplateMessageStatuses.SCHEDULED &&
      !this._scheduleDate
    )
      throw new TemplateMessageScheduleError(this.id);
  }

  get status(): TemplateMessageStatus {
    return this._status;
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

  get sentDate(): Nullable<MessageSentDate> {
    return this._sentDate;
  }

  get scheduleDate(): Nullable<TemplateMessageScheduleDate> {
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
}
