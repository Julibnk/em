import { TestEnvironmentManager } from '../domain/TestEnvironmentManager';
import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';

export class PrismaTestEnvironmentManager implements TestEnvironmentManager {
  client = PrismaClientSingleton.instance;

  async start(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      throw new InvalidTestEnvironmentError(process.env.NODE_ENV || '');
    }

    await this.dropDatabase();
  }

  async dropDatabase(): Promise<void> {
    const allProperties = Reflect.ownKeys(Object.getPrototypeOf(client));
    const modelNames = allProperties.filter(
      (x) =>
        x != 'constructor' &&
        x != 'on' &&
        x != 'connect' &&
        x != 'runDisconnect' &&
        x != 'disconnect'
    );

    for (const modelName of modelNames) {
      //eslint-disable-next-line
      await client[modelName].deleteMany();
    }
  }
}

export class InvalidTestEnvironmentError extends Error {
  constructor(environment: string) {
    super(`Test manager can´t be instanciated in ${environment} environment`);
  }
}
