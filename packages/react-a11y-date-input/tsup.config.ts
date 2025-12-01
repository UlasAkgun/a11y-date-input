import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: {
        compilerOptions: {
            composite: false,
        },
    },
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', '@repo/a11y-date-input'],
});
