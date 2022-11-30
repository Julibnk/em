import { inject, injectable } from 'inversify';
import { DiRepository } from '../../Shared/dependency-injection';
import { AccountPhoneRepository } from '../domain/AccountPhoneRepository';
import { AccountPhone } from '../domain/AccountPhone';
import { AccountPhoneId } from '../domain/value-object/AccountPhoneId';
import { AccountId } from '../../Account/domain/value-object/AccountId';
import { AccountPhoneNotFoundError } from '../domain/exceptions/AccountPhoneNotFoundError';
@injectable()
export class FindAccountPhoneUseCase {
  constructor(
    @inject(DiRepository.accountPhone)
    private readonly repository: AccountPhoneRepository
  ) {}

  async run(accountId: string, id: string): Promise<AccountPhone> {
    const accountPhone = await this.repository.findById(
      new AccountId(accountId),
      new AccountPhoneId(id)
    );

    if (!accountPhone) {
      throw new AccountPhoneNotFoundError(new AccountPhoneId(id));
    }

    return accountPhone;
  }
}
