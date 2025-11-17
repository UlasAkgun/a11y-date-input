import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // watch: {
    //   // Watch workspace packages for changes
    //   ignored: ['!**/node_modules/@repo/**'],
    // },
  },
  optimizeDeps: {
    // Exclude workspace packages from pre-bundling
    // This ensures Vite always loads the latest version
    // exclude: ['@repo/a11y-date-input'],
  },
});
