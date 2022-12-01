module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Allows the use of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    // 'plugin:unused-imports',
    // 'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
  ],
  env: {
    node: true,
    // jsx: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
