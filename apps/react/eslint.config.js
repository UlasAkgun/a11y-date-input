import reactConfig from '@repo/eslint-config/react';

export default [
  ...reactConfig,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
