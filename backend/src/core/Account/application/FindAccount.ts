import { AccountId } from '../../Account/domain/value-object/AccountId';
import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { AccountRepository } from '../domain/AccountRepository';
import { Account } from '../domain/Account';
import { AccountNotFoundError } from '../domain/exceptions/AccountNotFoundError';

@injectable()
export class FindAccountUseCase {
  constructor(
    @inject(DiRepository.account)
    private readonly repository: AccountRepository
  ) {}

  async run(id: string): Promise<Account> {
    const account = await this.repository.findById(new AccountId(id));

    if (!account) {
      throw new AccountNotFoundError(new AccountId(id));
    }

    return account;
  }
}
