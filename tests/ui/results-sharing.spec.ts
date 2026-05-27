import { expect, test } from "@playwright/test";

import { encodeScores, scoreMap } from "./helpers";

test("a shared results link can be named, saved, and opened from the collection", async ({
  page,
}) => {
  const sharedScores = scoreMap(0.75);

  await page.goto(`/results?scores=${encodeURIComponent(encodeScores(sharedScores))}`);

  await expect(page.getByText("Someone's Poligon was shared with you")).toBeVisible();
  await page.getByPlaceholder(/Alice/).fill("Morgan");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Morgan's Poligon")).toBeVisible();
  await page.getByRole("link", { name: /View collection/ }).click();

  await expect(page).toHaveURL(/\/shared$/);
  await expect(page.getByRole("heading", { name: "Shapes shared with me" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Morgan/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /View shape/ })).toBeVisible();
});

test("compare links show the ready comparison when the visitor already has scores", async ({
  page,
}) => {
  const myScores = scoreMap(0.8);
  const friendScores = scoreMap(-0.4);

  await page.addInitScript((scores) => {
    window.localStorage.setItem("pShape_scores", JSON.stringify(scores));
  }, myScores);

  const encodedFriendScores = encodeURIComponent(encodeScores(friendScores));
  await page.goto(`/compare?a=${encodedFriendScores}&name=Alex`);

  await expect(page.getByRole("heading", { name: "Your shapes, side by side" })).toBeVisible();
  await expect(page.getByText("Alex", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("agreement").first()).toBeVisible();

  await page.getByRole("button", { name: /View as overlay/ }).click();
  await expect(page.getByRole("button", { name: /View side by side/ })).toBeVisible();
});
