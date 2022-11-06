import { PrismaClientSingleton } from '../../../../src/core/Shared/infrastructure/PrismaClient';
import {
  InvalidTestEnvironmentError,
  PrismaTestEnvironmentManager,
} from './PrismaTestEnvironmentManager';

const client = PrismaClientSingleton.instance;

describe('PrismaTestEnvironmentManager', () => {
  it('Should not throw InvalidTestEnvironmentError if NODE_ENV is test', () => {
    expect(() => new PrismaTestEnvironmentManager(client)).not.toThrowError(
      InvalidTestEnvironmentError
    );
  });

  // Estos tests estan comentados porque puede ser peligroso cambiar el node env y intercedan con otros tests

  //   it('Should throw InvalidTestEnvironmentError if NODE_ENV is production', () => {
  //     const currentEnvironment = process.env.NODE_ENV;
  //     process.env.NODE_ENV = 'production';

  //     expect(() => new PrismaTestEnvironmentManager(client)).toThrowError(
  //       InvalidTestEnvironmentError
  //     );

  //     process.env.NODE_ENV = currentEnvironment;
  //   });

  //   it('Should throw InvalidTestEnvironmentError if NODE_ENV is development', () => {
  //     const currentEnvironment = process.env.NODE_ENV;
  //     process.env.NODE_ENV = 'development';

  //     expect(() => new PrismaTestEnvironmentManager(client)).toThrowError(
  //       InvalidTestEnvironmentError
  //     );

  //     process.env.NODE_ENV = currentEnvironment;
  //   });
});
