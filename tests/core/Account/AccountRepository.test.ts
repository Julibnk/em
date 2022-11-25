import { AccountRepository } from '../../../src/core/Account/domain/AccountRepository';
import { AccountId } from '../../../src/core/Account/domain/value-object/AccountId';
import {
  container,
  DiDomain,
  DiRepository,
} from '../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../Shared/infrastructure/TestEnvironmentManager';
import { AccountMother } from './domain/AccountMother';
import { AccountPersistenceError } from '../../../src/core/Account/domain/exceptions/AccountPersistenceError';

const environmentManager = container.get<TestEnvironmentManager>(
  DiDomain.environmentManager
);
const accountRepository = container.get<AccountRepository>(
  DiRepository.account
);

describe('AccountRepository', () => {
  beforeEach(async () => {
    await environmentManager.truncate();
  });

  afterAll(async () => {
    await environmentManager.truncate();
  });

  describe('=> save', () => {
    it('Should save an account', async () => {
      const account = AccountMother.random();

      await accountRepository.save(account);
    });

    it('Should throw an error if try to be related to another MetaAccount', async () => {
      const account = AccountMother.random();
      await accountRepository.save(account);

      const accountWithSameMetaAccount = AccountMother.withMetaAccount(
        account.metaAccount
      );
      expect(
        async () => await accountRepository.save(accountWithSameMetaAccount)
      ).rejects.toThrow(AccountPersistenceError);
    });
  });

  describe('=> findById', () => {
    it('Should find existent account', async () => {
      const account = AccountMother.random();

      await accountRepository.save(account);

      const accountFound = await accountRepository.findById(account.id);

      expect(accountFound).toEqual(account);
    });

    it('Should return null when inexistent account', async () => {
      const accountId = AccountId.random();
      const expectedAccount = await accountRepository.findById(accountId);
      expect(expectedAccount).toBeNull();
    });
  });
});
