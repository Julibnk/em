import {
  InvalidTestEnvironmentError,
  TestEnvironmentManager,
} from '../domain/TestEnvironmentManager';
import { PrismaClient, Prisma } from '@prisma/client';
import { injectable } from 'inversify';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';
import { AccountIdMother } from '../../Account/domain/AccountIdMother';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';

@injectable()
export class PrismaTestEnvironmentManager implements TestEnvironmentManager {
  private _client: PrismaClient;

  constructor() {
    this._client = PrismaClientSingleton.instance;
  }

  async start(): Promise<void> {
    this.ensureIsTestEnvironment();
    await this.dropDatabase();
  }

  async createAccount(): Promise<AccountId> {
    const accountId = AccountIdMother.random();

    // Por rendimiento se ejecuta el insert directamente en la base de datos
    await this._client
      .$executeRaw`INSERT INTO account (id) VALUES (${accountId.value})`;

    return accountId;
  }

  private async dropDatabase(): Promise<void> {
    const modelNames = PrismaClientSingleton.getPrismaModelNames();

    for (const modelName of modelNames) {
      // eslint-disable-next-line
      // @ts-ignore
      await this._client[modelName].deleteMany({}); // eslint-disable-line
    }
  }

  ensureIsTestEnvironment(): void {
    if (process.env.NODE_ENV !== 'test') {
      throw new InvalidTestEnvironmentError(process.env.NODE_ENV || '');
    }
  }
}
