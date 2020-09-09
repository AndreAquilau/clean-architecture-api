module.exports = {
  env: {
    es2017: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    Shared: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'class-methods-use-this': 'off',
    'no-return-await': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
