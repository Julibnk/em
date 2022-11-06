import { injectable } from 'inversify';

@injectable()
export abstract class TestEnvironmentManager {
  abstract start(): Promise<void>;
}

export class InvalidTestEnvironmentError extends Error {
  constructor(environment: string) {
    super(`Test manager can´t be started in ${environment} environment`);
  }
}
