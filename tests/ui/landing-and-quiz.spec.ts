import { expect, test } from "@playwright/test";

import { completeQuiz } from "./helpers";

test("home page starts the quiz from the primary call to action", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your views aren't"
  );
  await expect(page.getByText("10", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("40", { exact: true }).first()).toBeVisible();

  await page.getByRole("link", { name: /Discover My Shape/ }).click();

  await expect(page).toHaveURL(/\/quiz$/);
  await expect(page.getByRole("heading", { name: "Border Openness" })).toBeVisible();
  await expect(page.getByText("0% complete")).toBeVisible();
  await expect(page.getByRole("button", { name: "Next →", exact: true })).toBeDisabled();
});

test("a visitor can complete the quiz and land on their results", async ({ page }) => {
  await completeQuiz(page);

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Shape score")).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy compare link/ })).toBeVisible();
});
