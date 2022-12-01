module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
