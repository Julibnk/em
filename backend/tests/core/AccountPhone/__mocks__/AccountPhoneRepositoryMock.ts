import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';
import { AccountPhone } from '../../../../src/core/AccountPhone/domain/AccountPhone';
import { AccountPhoneRepository } from '../../../../src/core/AccountPhone/domain/AccountPhoneRepository';
import { AccountPhoneId } from '../../../../src/core/AccountPhone/domain/value-object/AccountPhoneId';
import { Nullable } from '../../../../src/core/Shared/domain/Nullable';
import { Phone } from '../../../../src/core/Shared/domain/Phone/Phone';

export class AccountPhoneRepositoryMock implements AccountPhoneRepository {
  mockFindByPhone = jest.fn();
  mockFindById = jest.fn();
  mockSave = jest.fn();
  mockSearchAll = jest.fn();

  private allAccountPhones: Array<AccountPhone> = [];
  private acccountPhoneByPhone: Nullable<AccountPhone> = null;
  private accountPhoneById: Nullable<AccountPhone> = null;

  returnFindByPhone(accountPhone: AccountPhone): void {
    this.acccountPhoneByPhone = accountPhone;
  }

  returnSearchAll(accountPhones: Array<AccountPhone>): void {
    this.allAccountPhones = accountPhones;
  }

  returnFindById(accountPhone: AccountPhone): void {
    this.accountPhoneById = accountPhone;
  }

  async findByPhone(
    accountId: AccountId,
    phone: Phone
  ): Promise<Nullable<AccountPhone>> {
    this.mockFindByPhone(accountId, phone);
    return this.acccountPhoneByPhone;
  }

  async findById(
    accountId: AccountId,
    id: AccountPhoneId
  ): Promise<Nullable<AccountPhone>> {
    this.mockFindById(accountId, id);

    return this.accountPhoneById;
  }

  async save(accountPhone: AccountPhone): Promise<void> {
    this.mockSave(accountPhone);
  }

  async searchAll(accountId: AccountId): Promise<AccountPhone[]> {
    this.mockSearchAll(accountId);
    return this.allAccountPhones;
  }
}
