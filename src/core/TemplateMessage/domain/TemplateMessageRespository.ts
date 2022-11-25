import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateMessage } from './TemplateMessage';
import { TemplateMessageId } from './value-object/TemplateMessageId';

export interface TemplateMessageRepository {
  save(templateMessage: TemplateMessage): Promise<void>;

  findById(
    accountId: AccountId,
    id: TemplateMessageId
  ): Promise<TemplateMessage>;

  searchAll(accountId: AccountId): Promise<TemplateMessage[]>;
}
