import baseConfig from '@repo/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['dist/**', 'node_modules/**', '.angular/**'],
  },
];
