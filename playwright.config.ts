import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const HOST = "localhost";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://${HOST}:${PORT}`;
const shouldStartServer = !process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/ui",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: shouldStartServer
    ? {
        command: `npm run dev -- --hostname ${HOST} --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
