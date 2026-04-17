import prettierConfig from 'eslint-config-prettier';

export default [
  {
    rules: {
      ...prettierConfig.rules,
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    }
  }
];