import {
  InvalidTestEnvironmentError,
  TestEnvironmentManager,
} from './TestEnvironmentManager';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';
import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountRepository } from '../../../../src/core/Account/domain/AccountRepository';
import { DIRepository } from '../../../../src/core/Shared/dependency-injection';
import { AccountMother } from '../../Account/domain/AccountMother';

@injectable()
export class PrismaTestEnvironmentManager implements TestEnvironmentManager {
  private _client: PrismaClient;

  constructor(
    @inject(DIRepository.account) private accountRepository: AccountRepository
  ) {
    this._client = PrismaClientSingleton.instance;
  }

  async truncate(): Promise<void> {
    this.ensureIsTestEnvironment();
    await this.truncateDatabase();
  }

  async createAccount(): Promise<Account> {
    const account = AccountMother.random();
    await this.accountRepository.save(account);
    return account;
  }

  private async truncateDatabase(): Promise<void> {
    // No puede ser dinámico....
    const tables = [
      '"User"',
      '"Contact"',
      '"Category"',
      '"Template"',
      '"Message"',
      '"AccountPhone"',
      '"Dictionary"',
      '"DictionaryText"',
      '"MetaAccount"',
      '"Account"',
    ];

    for (const table of tables) {
      await this._client.$queryRawUnsafe(`TRUNCATE TABLE ${table} CASCADE;`);
    }
  }

  ensureIsTestEnvironment(): void {
    if (process.env.NODE_ENV !== 'test') {
      throw new InvalidTestEnvironmentError(process.env.NODE_ENV || '');
    }
  }
}
