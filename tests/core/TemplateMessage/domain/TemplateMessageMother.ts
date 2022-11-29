import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { MessageSentDate } from '../../../../src/core/TemplateMessage/domain/value-object/MessageSentDate';
import { TemplateMessageId } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageId';
import { TemplateMessageScheduleDate } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageScheduleDate';
import { TemplateMessageParameter } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageParameter';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { ContactId } from '../../../../src/core/Contact/domain/value-object/ContactId';
import { AccountPhoneId } from '../../../../src/core/AccountPhone/domain/value-object/AccountPhoneId';
import { TemplateMessage } from '../../../../src/core/TemplateMessage/domain/TemplateMessage';
import {
  TemplateMessageStatus,
  TemplateMessageStatuses,
} from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageStatus';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { TemplateMessageIdMother } from './TemplateMessageIdMother';
import { MessageSentDateMother } from './MessageSentDateMother';
import { TemplateMessageScheduleDateMother } from './TemplateMessageScheduleDateMother';
import { TemplateMessageParameterMother } from './TemplateMessageParameterMother';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { AccountPhoneIdMother } from '../../AccountPhone/domain/AccountPhoneIdMother';
import { ContactIdMother } from '../../Contact/domain/ContactIdMother';
import { TemplateMessageStatusMother } from './TemplateMessageStatusMother';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';

export class TemplateMessageMother {
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
    scheduleDate: Nullable<TemplateMessageScheduleDate>,
    sentDate: Nullable<MessageSentDate>
  ): TemplateMessage {
    return new TemplateMessage(
      accountId,
      id,
      status,
      templateId,
      accountPhoneId,
      contactId,
      parameter1,
      parameter2,
      parameter3,
      sentDate,
      scheduleDate
    );
  }

  static random(): TemplateMessage {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      TemplateMessageStatusMother.random(),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      MessageSentDateMother.random(),
      TemplateMessageScheduleDateMother.random()
    );
  }

  static makeCopy(templateMessage: TemplateMessage): TemplateMessage {
    return this.create(
      templateMessage.accountId,
      templateMessage.id,
      templateMessage.status,
      templateMessage.templateId,
      templateMessage.accountPhoneId,
      templateMessage.contactId,
      templateMessage.parameter1,
      templateMessage.parameter2,
      templateMessage.parameter3,
      templateMessage.sentDate,
      templateMessage.scheduleDate
    );
  }

  static draft(): TemplateMessage {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      TemplateMessageStatus.fromValue(TemplateMessageStatuses.DRAFT),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      null,
      null
    );
  }

  static pending(): TemplateMessage {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      TemplateMessageStatus.fromValue(TemplateMessageStatuses.PENDING),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      null,
      null
    );
  }

  static sent(): TemplateMessage {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      TemplateMessageStatus.fromValue(TemplateMessageStatuses.SENT),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      null,
      MessageSentDateMother.random()
    );
  }
  static scheduled(): TemplateMessage {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      TemplateMessageStatus.fromValue(TemplateMessageStatuses.SCHEDULED),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageScheduleDateMother.random(),
      null
    );
  }

  static withAllRelations(
    accountId: AccountId,
    templateId: TemplateId,
    accountPhoneId: AccountPhoneId,
    contactId: ContactId
  ): TemplateMessage {
    return this.create(
      accountId,
      TemplateMessageIdMother.random(),
      TemplateMessageStatusMother.random(),
      templateId,
      accountPhoneId,
      contactId,
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      MessageSentDateMother.random(),
      TemplateMessageScheduleDateMother.random()
    );
  }
}
