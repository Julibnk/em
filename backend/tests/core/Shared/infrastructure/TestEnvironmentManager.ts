import { injectable } from 'inversify';
import { Account } from '../../../../src/core/Account/domain/Account';

@injectable()
export abstract class TestEnvironmentManager {
  abstract truncate(): Promise<void>;
  abstract createAccount(): Promise<Account>;
}

export class InvalidTestEnvironmentError extends Error {
  constructor(environment: string) {
    super(`Test manager can´t be started in ${environment} environment`);
  }
}
