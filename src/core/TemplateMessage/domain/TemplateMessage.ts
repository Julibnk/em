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
import { ScheduleDateRequiredError } from './exceptions/ScheduleDateRequiredError';

export type TemplateMessagePrimitives = Omit<
  Primitives<TemplateMessage>,
  | 'status'
  | 'parameter1'
  | 'parameter2'
  | 'parameter3'
  | 'sentDate'
  | 'scheduleDate'
> & {
  status: string;
  parameter1: Nullable<string>;
  parameter2: Nullable<string>;
  parameter3: Nullable<string>;
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
    private _parameter1: Nullable<TemplateMessageParameter>,
    private _parameter2: Nullable<TemplateMessageParameter>,
    private _parameter3: Nullable<TemplateMessageParameter>,
    private _sentDate: Nullable<MessageSentDate>,
    private _scheduleDate: Nullable<TemplateMessageScheduleDate>
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
      primitives.parameter1
        ? new TemplateMessageParameter(primitives.parameter1)
        : null,
      primitives.parameter2
        ? new TemplateMessageParameter(primitives.parameter2)
        : null,
      primitives.parameter3
        ? new TemplateMessageParameter(primitives.parameter3)
        : null,
      primitives.sentDate && new MessageSentDate(primitives.sentDate),
      primitives.scheduleDate &&
        new TemplateMessageScheduleDate(primitives.scheduleDate)
    );
  }

  static create(
    accountId: AccountId,
    id: TemplateMessageId,
    status: TemplateMessageStatus,
    templateId: TemplateId,
    accountPhoneId: AccountPhoneId,
    contactId: ContactId,
    parameter1: Nullable<TemplateMessageParameter>,
    parameter2: Nullable<TemplateMessageParameter>,
    parameter3: Nullable<TemplateMessageParameter>,
    scheduleDate: Nullable<TemplateMessageScheduleDate>
  ): TemplateMessage {
    const templateMessage = new TemplateMessage(
      accountId,
      id,
      TemplateMessageStatus.fromValue(TemplateMessageStatuses.DRAFT),
      templateId,
      accountPhoneId,
      contactId,
      parameter1,
      parameter2,
      parameter3,
      null,
      null
    );

    if (status.value === TemplateMessageStatuses.SCHEDULED) {
      templateMessage.schedule(scheduleDate);
    }

    if (status.value === TemplateMessageStatuses.SENT) {
      templateMessage.send();
    }

    return templateMessage;
  }

  change(
    status: TemplateMessageStatus,
    templateId: TemplateId,
    accountPhoneId: AccountPhoneId,
    contactId: ContactId,
    parameter1: Nullable<TemplateMessageParameter>,
    parameter2: Nullable<TemplateMessageParameter>,
    parameter3: Nullable<TemplateMessageParameter>,
    scheduleDate: Nullable<TemplateMessageScheduleDate>
  ) {
    if (this.status.value === TemplateMessageStatuses.SENT) return;

    this._parameter1 = parameter1;
    this._parameter2 = parameter2;
    this._parameter3 = parameter3;
    this._templateId = templateId;
    this._accountPhoneId = accountPhoneId;
    this._contactId = contactId;

    this.ensureConsistency();

    if (status.value === TemplateMessageStatuses.SCHEDULED) {
      this.schedule(scheduleDate);
    }

    if (status.value === TemplateMessageStatuses.SENT) {
      this.send();
    }
  }

  schedule(scheduleDate: Nullable<TemplateMessageScheduleDate>) {
    if (!scheduleDate) throw ScheduleDateRequiredError;

    this._status = TemplateMessageStatus.fromValue(
      TemplateMessageStatuses.SCHEDULED
    );
    this._scheduleDate = scheduleDate;
  }

  send() {
    this._status = TemplateMessageStatus.fromValue(
      TemplateMessageStatuses.SENT
    );
    this._sentDate = new MessageSentDate(new Date());
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

  get parameter1(): Nullable<TemplateMessageParameter> {
    return this._parameter1;
  }

  get parameter2(): Nullable<TemplateMessageParameter> {
    return this._parameter2;
  }

  get parameter3(): Nullable<TemplateMessageParameter> {
    return this._parameter3;
  }
}
