# @repo/eslint-config

Shared ESLint configuration for the monorepo.

## Usage

### For TypeScript projects

In your `eslint.config.js`:

```js
import baseConfig from '@repo/eslint-config';

export default [
  ...baseConfig,
  // Your additional rules here
];
```

### For React projects

```js
import reactConfig from '@repo/eslint-config/react';

export default [
  ...reactConfig,
  // Your additional rules here
];
```

## Available Configurations

- `@repo/eslint-config` - Base TypeScript configuration
- `@repo/eslint-config/react` - React + TypeScript configuration
