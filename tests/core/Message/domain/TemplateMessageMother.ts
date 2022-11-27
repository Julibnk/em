import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { MessageSentDate } from '../../../../src/core/TemplateMessage/domain/value-object/MessageSentDate';
import { TemplateMessageId } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageId';
import { TemplateMessageScheduleDate } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageScheduleDate';
import { TemplateMessageParameter } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageParameter';
import { TemplateId } from '../../../../src/core/Template/domain/value-object/TemplateId';
import { ContactId } from '../../../../src/core/Contact/domain/value-object/ContactId';
import { AccountPhoneId } from '../../../../src/core/AccountPhone/domain/value-object/AccountPhoneId';
import { TemplateMessage } from '../../../../src/core/TemplateMessage/domain/TemplateMessage';
import { TemplateMessageStatus } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageStatus';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { TemplateMessageIdMother } from './TemplateMessageIdMother';
import { MessageSentDateMother } from './MessageSentDateMother';
import { TemplateMessageScheduleDateMother } from './TemplateMessageScheduleDateMother';
import { TemplateMessageParameterMother } from './TemplateMessageParameterMother';
import { TemplateIdMother } from '../../Template/domain/TemplateIdMother';
import { AccountPhoneIdMother } from '../../AccountPhone/domain/AccountPhoneIdMother';
import { ContactIdMother } from '../../Contact/domain/ContactIdMother';
import { TemplateMessageStatusMother } from './TemplateMessageStatusMother';

export class TemplateMessageMother {
  static create(
    accountId: AccountId,
    id: TemplateMessageId,
    status: TemplateMessageStatus,
    sentDate: MessageSentDate,
    scheduleDate: TemplateMessageScheduleDate,
    parameter1: TemplateMessageParameter,
    parameter2: TemplateMessageParameter,
    parameter3: TemplateMessageParameter,
    templateId: TemplateId,
    accountPhoneId: AccountPhoneId,
    contactId: ContactId
  ): TemplateMessage {
    return new TemplateMessage(
      accountId,
      id,
      status,
      sentDate,
      scheduleDate,
      parameter1,
      parameter2,
      parameter3,
      templateId,
      accountPhoneId,
      contactId
    );
  }

  static random(): TemplateMessageMother {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      TemplateMessageStatusMother.random(),
      MessageSentDateMother.random(),
      TemplateMessageScheduleDateMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random()
    );
  }

  static makeCopy(templateMessage: TemplateMessage): TemplateMessage {
    return this.create(
      templateMessage.accountId,
      templateMessage.id,
      templateMessage.status,
      templateMessage.sentDate,
      templateMessage.scheduleDate,
      templateMessage.parameter1,
      templateMessage.parameter2,
      templateMessage.parameter3,
      templateMessage.templateId,
      templateMessage.accountPhoneId,
      templateMessage.contactId
    );
  }

  static withStatus(
    templateMessageStatus: TemplateMessageStatus
  ): TemplateMessage {
    return this.create(
      AccountIdMother.random(),
      TemplateMessageIdMother.random(),
      templateMessageStatus,
      MessageSentDateMother.random(),
      TemplateMessageScheduleDateMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random()
    );
  }
  static withAccount(accountId: AccountId): TemplateMessage {
    return this.create(
      accountId,
      TemplateMessageIdMother.random(),
      TemplateMessageStatusMother.random(),
      MessageSentDateMother.random(),
      TemplateMessageScheduleDateMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateIdMother.random(),
      AccountPhoneIdMother.random(),
      ContactIdMother.random()
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
      MessageSentDateMother.random(),
      TemplateMessageScheduleDateMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      TemplateMessageParameterMother.random(),
      templateId,
      accountPhoneId,
      contactId
    );
  }
}
