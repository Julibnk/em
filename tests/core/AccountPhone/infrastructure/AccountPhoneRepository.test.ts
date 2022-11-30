import { AccountPhoneMother } from '../domain/AccountPhoneMother';
import { AccountPhoneRepository } from '../../../../src/core/AccountPhone/domain/AccountPhoneRepository';
import {
  container,
  DiDomain,
  DiRepository,
} from '../../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../../Shared/infrastructure/TestEnvironmentManager';
import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { AccountPhonePersistenceError } from '../../../../src/core/AccountPhone/domain/exceptions/AccountPhonePersistenceError';
import { AccountPhoneIdMother } from '../domain/AccountPhoneIdMother';
import { AccountPhone } from '../../../../src/core/AccountPhone/domain/AccountPhone';

let account: Account;

const enviromentManager = container.get<TestEnvironmentManager>(
  DiDomain.environmentManager
);
const repository = container.get<AccountPhoneRepository>(
  DiRepository.accountPhone
);

describe('AccountPhoneRepository', () => {
  beforeEach(async () => {
    await enviromentManager.truncate();
    account = await enviromentManager.createAccount();
  });

  afterAll(async () => {
    await enviromentManager.truncate();
  });

  describe('=> save', () => {
    it('Should save an AccountPhone', async () => {
      const accountPhone = AccountPhoneMother.withAccount(account.id);
      await repository.save(accountPhone);
    });

    it('Can´t save a AccountPhone for invalid account', async () => {
      const accountPhone = AccountPhoneMother.withAccount(
        AccountIdMother.random()
      );
      expect(async () => await repository.save(accountPhone)).rejects.toThrow(
        AccountPhonePersistenceError
      );
    });
  });

  describe('=> searchAll', () => {
    it('Should return all AccountPhones', async () => {
      const accountPhones = [
        AccountPhoneMother.withAccount(account.id),
        AccountPhoneMother.withAccount(account.id),
        AccountPhoneMother.withAccount(account.id),
      ];

      for (const accountPhone of accountPhones) {
        await repository.save(accountPhone);
      }

      const accountPhonesExpected = await repository.searchAll(account.id);
      expect(
        accountPhonesExpected.sort((a, b) => AccountPhone.sortById(a, b))
      ).toEqual(accountPhones.sort((a, b) => AccountPhone.sortById(a, b)));
    });

    it('Should´t return account phones from other account ', async () => {
      const otherAccount = await enviromentManager.createAccount();

      const otherAccountPhones = [
        AccountPhoneMother.withAccount(otherAccount.id),
        AccountPhoneMother.withAccount(otherAccount.id),
        AccountPhoneMother.withAccount(otherAccount.id),
      ];

      for (const accountPhone of otherAccountPhones) {
        await repository.save(accountPhone);
      }

      const thisAccountPhones = await repository.searchAll(account.id);
      expect(thisAccountPhones.length).toBe(0);
    });
  });

  describe('=> findById', () => {
    it('Should find AccountPhone by its ID', async () => {
      const accountPhone = AccountPhoneMother.withAccount(account.id);

      await repository.save(accountPhone);

      const accountPhoneExpected = await repository.findById(
        accountPhone.accountId,
        accountPhone.id
      );

      expect(accountPhoneExpected).toEqual(accountPhone);
    });

    it('Should return null when accountPhone does not exist', async () => {
      const expected = await repository.findById(
        account.id,
        AccountPhoneIdMother.random()
      );
      expect(expected).toBeNull();
    });
  });

  describe('=> findByPhone', () => {
    it('Should find AccountPhone by its phone', async () => {
      const accountPhone = AccountPhoneMother.withAccount(account.id);

      await repository.save(accountPhone);

      const accountPhoneExpected = await repository.findByPhone(
        accountPhone.accountId,
        accountPhone.phone
      );

      expect(accountPhoneExpected).toEqual(accountPhone);
    });
    it('Should return null if phone is not found', async () => {
      const accountPhone = AccountPhoneMother.withAccount(account.id);

      const expected = await repository.findByPhone(
        accountPhone.accountId,
        accountPhone.phone
      );

      expect(expected).toBeNull();
    });
  });
});
