import { AccountId } from '../../Account/domain/value-object/AccountId';
import { Nullable } from '../../Shared/domain/Nullable';
import { TemplateMessage } from './TemplateMessage';
import { TemplateMessageId } from './value-object/TemplateMessageId';

export interface TemplateMessageRepository {
  save(templateMessage: TemplateMessage): Promise<void>;

  findById(
    accountId: AccountId,
    id: TemplateMessageId
  ): Promise<Nullable<TemplateMessage>>;

  // searchAll(accountId: AccountId): Promise<TemplateMessage[]>;
}
