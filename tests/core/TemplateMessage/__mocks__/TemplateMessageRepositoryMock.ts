import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { TemplateMessage } from '../../../../src/core/TemplateMessage/domain/TemplateMessage';
import { TemplateMessageRepository } from '../../../../src/core/TemplateMessage/domain/TemplateMessageRespository';
import { TemplateMessageId } from '../../../../src/core/TemplateMessage/domain/value-object/TemplateMessageId';

export class TemplateMessageRepositoryMock
  implements TemplateMessageRepository
{
  mockSave = jest.fn();
  mockFindById = jest.fn();

  private messageById: Nullable<TemplateMessage> = null;

  returnFindById(message: TemplateMessage): void {
    this.messageById = message;
  }

  async save(message: TemplateMessage): Promise<void> {
    this.mockSave(message);
  }

  async findById(
    accountId: AccountId,
    id: TemplateMessageId
  ): Promise<Nullable<TemplateMessage>> {
    this.mockFindById(accountId, id);

    return this.messageById;
  }
}
