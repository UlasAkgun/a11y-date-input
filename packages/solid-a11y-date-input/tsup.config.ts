import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm'],
  dts: false, // Disabled due to missing custom element types
  sourcemap: true,
  clean: true,
  outExtension: ({ format }) => ({
    js: '.jsx',
  }),
  external: ['solid-js', '@repo/a11y-date-input'],
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
});
