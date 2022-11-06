import { TestEnvironmentManager } from '../domain/TestEnvironmentManager';
import { PrismaClient } from '@prisma/client';

export class PrismaTestEnvironmentManager implements TestEnvironmentManager {
  constructor(private _client: PrismaClient) {
    this.ensureIsTestEnvironment();
  }

  async start(): Promise<void> {
    await this.dropDatabase();
  }

  private async dropDatabase(): Promise<void> {
    // const allProperties = Reflect.ownKeys(Object.getPrototypeOf(client));
    // const modelNames = allProperties.filter(
    //   (x) =>
    //     x != 'constructor' &&
    //     x != 'on' &&
    //     x != 'connect' &&
    //     x != 'runDisconnect' &&
    //     x != 'disconnect'
    // );
    // for (const modelName of modelNames) {
    //   // eslint-disable-next-line
    //   // @ts-ignore
    //   await client[modelName].deleteMany();
    // }
  }

  ensureIsTestEnvironment(): void {
    if (process.env.NODE_ENV !== 'test') {
      throw new InvalidTestEnvironmentError(process.env.NODE_ENV || '');
    }
  }
}

export class InvalidTestEnvironmentError extends Error {
  constructor(environment: string) {
    super(`Test manager can´t be started in ${environment} environment`);
  }
}
