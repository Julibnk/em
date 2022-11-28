import { inject, injectable } from 'inversify';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AccountPhoneId } from '../../AccountPhone/domain/value-object/AccountPhoneId';
import { ContactId } from '../../Contact/domain/value-object/ContactId';
import { DiRepository } from '../../Shared/dependency-injection';
import { Nullable } from '../../Shared/domain/Nullable';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { TemplateMessage } from '../domain/TemplateMessage';
import { TemplateMessageRepository } from '../domain/TemplateMessageRespository';
import { TemplateMessageId } from '../domain/value-object/TemplateMessageId';
import { TemplateMessageParameter } from '../domain/value-object/TemplateMessageParameter';
import { TemplateMessageScheduleDate } from '../domain/value-object/TemplateMessageScheduleDate';
import { TemplateMessageStatus } from '../domain/value-object/TemplateMessageStatus';

export type Params = {
  accountId: string;
  id: string;
  status: string;
  templateId: string;
  accountPhoneId: string;
  contactId: string;
  parameter1: Nullable<string>;
  parameter2: Nullable<string>;
  parameter3: Nullable<string>;
  scheduleDate: Nullable<Date>;
};

@injectable()
export class SaveTemplateMessageUseCase {
  constructor(
    @inject(DiRepository.category)
    private repository: TemplateMessageRepository
  ) {}

  async run(params: Params): Promise<void> {
    const accountId = new AccountId(params.accountId);
    const id = new TemplateMessageId(params.id);
    const status = TemplateMessageStatus.fromValue(params.status);
    const templateId = new TemplateId(params.templateId);
    const accountPhoneId = new AccountPhoneId(params.accountPhoneId);
    const contactId = new ContactId(params.contactId);
    const parameter1 = params.parameter1
      ? new TemplateMessageParameter(params.parameter1)
      : null;
    const parameter2 = params.parameter2
      ? new TemplateMessageParameter(params.parameter2)
      : null;
    const parameter3 = params.parameter3
      ? new TemplateMessageParameter(params.parameter3)
      : null;
    const scheduleDate = params.scheduleDate
      ? new TemplateMessageScheduleDate(params.scheduleDate)
      : null;

    let templateMessage = await this.repository.findById(accountId, id);

    if (templateMessage) {
      templateMessage.change(
        status,
        templateId,
        accountPhoneId,
        contactId,
        parameter1,
        parameter2,
        parameter3,
        scheduleDate
      );
    } else {
      templateMessage = TemplateMessage.create(
        accountId,
        id,
        status,
        templateId,
        accountPhoneId,
        contactId,
        parameter1,
        parameter2,
        parameter3,
        scheduleDate
      );
    }

    await this.repository.save(templateMessage);
  }
}
