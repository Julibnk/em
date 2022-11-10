import { AccountRepository } from '../../../src/core/Account/domain/AccountRepository';
import { AccountNotFoundError } from '../../../src/core/Account/domain/exceptions/AccountNotFoundError';
import { AccountId } from '../../../src/core/Account/domain/value-object/AccountId';
import {
  container,
  DIRepository,
} from '../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../Shared/infrastructure/TestEnvironmentManager';
import { AccountMother } from './domain/AccountMother';

const environmentManager = container.get<TestEnvironmentManager>(
  DIRepository.environmentManager
);
const accountRepository = container.get<AccountRepository>(
  DIRepository.account
);

describe('AccountRepository', () => {
  describe('save', () => {
    it('Should save an account', async () => {
      const account = AccountMother.random();

      await accountRepository.save(account);

      await environmentManager.deleteAccount(account);
    });
  });

  describe('findById', () => {
    it('Should find existent account', async () => {
      const account = AccountMother.random();

      await accountRepository.save(account);

      const accountFound = await accountRepository.findById(account.id);

      expect(accountFound).toEqual(account);

      await environmentManager.deleteAccount(account);
    });

    it('Should throw error when inexistent account', async () => {
      try {
        const accountId = AccountId.random();
        await accountRepository.findById(accountId);
      } catch (error) {
        expect(error).toBeInstanceOf(AccountNotFoundError);
      }
    });
  });
});
