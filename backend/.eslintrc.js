module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  },
};
