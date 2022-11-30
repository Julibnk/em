import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { TemplateMessageRepository } from '../domain/TemplateMessageRespository';
import { TemplateMessage } from '../domain/TemplateMessage';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { TemplateMessageId } from '../domain/value-object/TemplateMessageId';
import { TemplateMessageNotFoundError } from '../domain/exceptions/TemplateMessageNotFoundError';

@injectable()
export class FindTemplateMessageUseCase {
  constructor(
    @inject(DiRepository.templateMessage)
    private readonly repository: TemplateMessageRepository
  ) {}

  async run(accountId: string, id: string): Promise<TemplateMessage> {
    const templateMessage = await this.repository.findById(
      new AccountId(accountId),
      new TemplateMessageId(id)
    );

    if (!templateMessage) {
      throw new TemplateMessageNotFoundError(new TemplateMessageId(id));
    }

    return templateMessage;
  }
}
