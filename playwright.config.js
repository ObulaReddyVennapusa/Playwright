// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries:2,
  timeout: 30 * 1000,
  expect: {

    timeout: 5*1000,
  },
  reporter: 'html',
  use: {
   browserName: 'chromium',
   headless: false,
   Screenshot:'on',
trace: "retain-on-failure",
  },
});

