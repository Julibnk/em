import {
  InvalidTestEnvironmentError,
  PrismaTestEnvironmentManager,
} from './PrismaTestEnvironmentManager';

describe('PrismaTestEnvironmentManager', () => {
  it('Should throw InvalidTestEnvironmentError if NODE_ENV is production', () => {
    const currentEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    expect(() => new PrismaTestEnvironmentManager()).toThrowError(
      InvalidTestEnvironmentError
    );

    process.env.NODE_ENV = currentEnvironment;
  });

  it('Should throw InvalidTestEnvironmentError if NODE_ENV is development', () => {
    const currentEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    expect(() => new PrismaTestEnvironmentManager()).toThrowError(
      InvalidTestEnvironmentError
    );

    process.env.NODE_ENV = currentEnvironment;
  });

  it('Should not throw InvalidTestEnvironmentError if NODE_ENV is test', () => {
    const currentEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    expect(() => new PrismaTestEnvironmentManager()).not.toThrowError(
      InvalidTestEnvironmentError
    );

    process.env.NODE_ENV = currentEnvironment;
  });
});
