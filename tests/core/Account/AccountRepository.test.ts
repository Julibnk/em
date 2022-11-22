import { AccountRepository } from '../../../src/core/Account/domain/AccountRepository';
import { AccountId } from '../../../src/core/Account/domain/value-object/AccountId';
import {
  container,
  DIDomain,
} from '../../../src/core/Shared/dependency-injection';
import { TestEnvironmentManager } from '../Shared/infrastructure/TestEnvironmentManager';
import { AccountMother } from './domain/AccountMother';

const environmentManager = container.get<TestEnvironmentManager>(
  DIDomain.environmentManager
);
const accountRepository = container.get<AccountRepository>(DIDomain.account);

describe('AccountRepository', () => {
  beforeEach(async () => {
    await environmentManager.truncate();
  });

  afterAll(async () => {
    await environmentManager.truncate();
  });

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

    it('Should return null when inexistent account', async () => {
      const accountId = AccountId.random();
      const expectedAccount = await accountRepository.findById(accountId);
      expect(expectedAccount).toBeNull();
    });
  });
});
