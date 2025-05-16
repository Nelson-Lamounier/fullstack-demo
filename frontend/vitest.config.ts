import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';


export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Optional: Add setup file
    exclude: [...configDefaults.exclude, 'e2e/*'], // Example custom exclusion
  },
});