import {
  container,
  DIRepository,
} from '../../../../src/core/Shared/dependency-injection';
import {
  TestEnvironmentManager,
  InvalidTestEnvironmentError,
} from '../domain/TestEnvironmentManager';

describe('TestEnvironmentManager', () => {
  it('Should not throw InvalidTestEnvironmentError if NODE_ENV is test', () => {
    const enviromentManager = container.get<TestEnvironmentManager>(
      DIRepository.environmentManager
    );

    expect(() => enviromentManager.truncate()).not.toThrowError(
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
