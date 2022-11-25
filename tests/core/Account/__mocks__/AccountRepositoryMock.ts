import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountRepository } from '../../../../src/core/Account/domain/AccountRepository';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';

export class AccountRepositoryMock implements AccountRepository {
  mockFindById = jest.fn();
  mockSave = jest.fn();

  private accountById: Nullable<Account> = null;

  returnFindById(account: Account): void {
    this.accountById = account;
  }

  async findById(id: AccountId): Promise<Nullable<Account>> {
    this.mockFindById(id);

    return this.accountById;
  }

  async save(account: Account): Promise<void> {
    this.mockSave(account);
  }
}
