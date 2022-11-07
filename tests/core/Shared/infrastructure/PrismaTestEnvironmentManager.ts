import {
  InvalidTestEnvironmentError,
  TestEnvironmentManager,
} from '../domain/TestEnvironmentManager';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';
import { Account } from '../../../../src/core/Account/domain/Account';
import { AccountRepository } from '../../../../src/core/Account/domain/AccountRepository';
import { DIRepository } from '../../../../src/core/Shared/dependency-injection';

@injectable()
export class PrismaTestEnvironmentManager implements TestEnvironmentManager {
  private _client: PrismaClient;

  constructor(
    @inject(DIRepository.account) private _accountRepository: AccountRepository
  ) {
    this._client = PrismaClientSingleton.instance;
  }

  async truncate(): Promise<void> {
    this.ensureIsTestEnvironment();
    await this.truncateDatabase();
  }

  async createAccount(account: Account): Promise<void> {
    await this._accountRepository.save(account);
  }

  async deleteAccount(account: Account): Promise<void> {
    await this._client.account.delete({
      where: {
        id: account.id.value,
      },
    });
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
