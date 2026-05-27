import { expect, test } from "@playwright/test";

import { encodeScores, scoreMap } from "./helpers";

function seedScoresScript(scores: Record<string, number>) {
  window.localStorage.setItem("pShape_scores", JSON.stringify(scores));
}

test("My Poligon loads own shape from localStorage", async ({ page }) => {
  await page.addInitScript(seedScoresScript, scoreMap(0.5));

  await page.goto("/results");

  await expect(page.getByText("Your political archetype")).toBeVisible();
  await expect(page.getByText("Shape score")).toBeVisible();
  await expect(page.getByText("Someone's Poligon")).not.toBeVisible();
});

test("My Poligon shows own shape after viewing a shared link", async ({ page }) => {
  const myScores = scoreMap(0.5);
  const sharedScores = scoreMap(-0.8);

  await page.addInitScript(seedScoresScript, myScores);

  await page.goto(`/results?scores=${encodeURIComponent(encodeScores(sharedScores))}`);
  await expect(page.getByText("Someone's Poligon was shared with you")).toBeVisible();

  await page.getByRole("link", { name: "My Poligon" }).click();

  await expect(page).toHaveURL(/\/results$/);
  await expect(page.getByText("Your political archetype")).toBeVisible();
  await expect(page.getByText("Someone's Poligon")).not.toBeVisible();
});

test("results page tabs switch content", async ({ page }) => {
  await page.addInitScript(seedScoresScript, scoreMap(0.6));

  await page.goto("/results");

  await expect(page.getByRole("button", { name: "Category Breakdown" })).toBeVisible();

  await page.getByRole("button", { name: "Compare Ideologies" }).click();
  await expect(page.getByText("Compare with political ideologies")).toBeVisible();

  await page.getByRole("button", { name: "Share & Embed" }).click();
  await expect(page.getByText("Download as PNG")).toBeVisible();
});
