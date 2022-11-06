import {
  InvalidTestEnvironmentError,
  TestEnvironmentManager,
} from '../domain/TestEnvironmentManager';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';

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

  private async dropDatabase(): Promise<void> {
    const allProperties = Reflect.ownKeys(Object.getPrototypeOf(this._client));
    const modelNames = allProperties.filter(
      (x) =>
        x != 'constructor' &&
        x != 'on' &&
        x != 'connect' &&
        x != 'runDisconnect' &&
        x != 'disconnect'
    );
    for (const modelName of modelNames) {
      // eslint-disable-next-line
      // @ts-ignore
      await this._client[modelName].deleteMany(); // eslint-disable-line
    }
  }

  ensureIsTestEnvironment(): void {
    if (process.env.NODE_ENV !== 'test') {
      throw new InvalidTestEnvironmentError(process.env.NODE_ENV || '');
    }
  }
}
