// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  retries:1,

  timeout: 40 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        Screenshot: "on",
        trace: "retain-on-failure",
        //...devices['iPhone 15 Pro Max']
      },
    },

    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        Screenshot: "off",
        trace: "retain-on-failure",
        ignoreHTTPSErrors:true,
        video:'retain-on-failure',
        permissions:['geolocation'],
        //...devices['Pixel 7 landscape']
        viewport: {width:720, height:720}
      },
    },
    {
      name: "firefoxBrowser",
      use: {
        browserName: "firefox",
        headless: true,
        Screenshot: "on",
        trace: "retain-on-failure",
      },
    },
  ],
});
