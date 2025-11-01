import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/config/tests/setup.tsx',
    deps: {
      optimizer: {
        web: {
          include: ['@mui/x-data-grid'],
        },
      },
    },
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/main.{js,jsx,ts,tsx}',
        'src/shared/config/tests/setup.ts.{js,ts}',
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/**/theme.ts',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
