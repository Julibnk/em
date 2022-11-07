import { injectable } from 'inversify';
import { AccountId } from '../../../../src/core/Account/domain/value-object/AccountId';

@injectable()
export abstract class TestEnvironmentManager {
  abstract start(): Promise<void>;
  abstract createAccount(): Promise<AccountId>;
}

export class InvalidTestEnvironmentError extends Error {
  constructor(environment: string) {
    super(`Test manager can´t be started in ${environment} environment`);
  }
}
