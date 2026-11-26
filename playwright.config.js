import { defineConfig, devices } from '@playwright/test';

const BASE_PATH = '/SimpleSolarSystemSandbox/';
const PREVIEW_PORT = 4173;
const DEV_PORT = 5173;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      // Software WebGL for CI runners without a GPU.
      args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
    },
  },
  projects: [
    { name: 'production-build', use: { baseURL: `http://localhost:${PREVIEW_PORT}${BASE_PATH}` } },
    { name: 'dev-server', use: { baseURL: `http://localhost:${DEV_PORT}${BASE_PATH}` } },
  ],
  webServer: [
    {
      command: `npm run build && npx vite preview --port ${PREVIEW_PORT} --strictPort`,
      url: `http://localhost:${PREVIEW_PORT}${BASE_PATH}`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: `npx vite --port ${DEV_PORT} --strictPort`,
      url: `http://localhost:${DEV_PORT}${BASE_PATH}`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
