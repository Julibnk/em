import { AccountRepository } from '../../../src/core/Account/domain/AccountRepository';
import { AccountNotFoundError } from '../../../src/core/Account/domain/exceptions/AccountNotFoundError';
import { AccountId } from '../../../src/core/Account/domain/value-object/AccountId';
import {
  container,
  DIRepository,
} from '../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../Shared/domain/TestEnvironmentManager';
import { AccountMother } from './domain/AccountMother';

describe('AccountRepository', () => {
  const environmentManager = container.get<TestEnvironmentManager>(
    DIRepository.environmentManager
  );
  const accountRepository = container.get<AccountRepository>(
    DIRepository.account
  );

  beforeEach(async () => {
    environmentManager.start();
  });

  // await environmentManager.start();}

  describe('save', () => {
    it('Should save an account', async () => {
      const account = AccountMother.random();

      await accountRepository.save(account);
    });
  });

  describe('findById', () => {
    it('Should find existent account', async () => {
      const account = AccountMother.random();

      await accountRepository.save(account);

      const accountFound = await accountRepository.findById(account.id);

      expect(accountFound).toEqual(account);
    });

    it('Should throw error when inexistent account', () => {
      const accountId = AccountId.random();

      expect(() => accountRepository.findById(accountId)).rejects.toThrowError(
        AccountNotFoundError
      );
    });
  });
});
