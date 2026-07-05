import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globalSetup: ['tests/global-setup.ts'],
    // browser-driven tests: allow for Chromium startup and page loads
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
