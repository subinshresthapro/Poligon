import { expect, test } from "@playwright/test";

import { encodeScores, scoreMap } from "./helpers";

test("profiles page renders candidate profile cards", async ({ page }) => {
  await page.goto("/profiles");

  await expect(
    page.getByRole("heading", { name: "Sample Political Profiles" })
  ).toBeVisible();
  await expect(page.locator("a[href^='/profiles/']").first()).toBeVisible();
});

test("about page renders", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Politics is more nuanced"
  );
});

test("compare page without local scores prompts visitor to take the quiz", async ({
  page,
}) => {
  const friendScores = scoreMap(-0.5);

  await page.goto(
    `/compare?a=${encodeURIComponent(encodeScores(friendScores))}&name=Jordan`
  );

  await expect(page.getByText("Jordan shared their Poligon")).toBeVisible();
  await expect(
    page.getByText("Take the quiz to see how your shape compares")
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Take the Quiz →" })).toBeVisible();
});
