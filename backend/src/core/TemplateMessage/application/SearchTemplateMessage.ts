import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { TemplateMessageRepository } from '../domain/TemplateMessageRespository';
import { TemplateMessage } from '../domain/TemplateMessage';
import { AccountId } from '../../Account/domain/value-object/AccountId';

export type Params = {
  accountId: string;
};

@injectable()
export class SearchTemplateMessageUseCase {
  constructor(
    @inject(DiRepository.templateMessage)
    private readonly repository: TemplateMessageRepository
  ) {}

  async run({ accountId }: Params): Promise<TemplateMessage[]> {
    const templateMessages = await this.repository.search(
      new AccountId(accountId)
    );

    return templateMessages;
  }
}
