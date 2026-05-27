import { expect, type Page } from "@playwright/test";

export const CATEGORY_IDS = [
  "immigration",
  "government",
  "economy",
  "healthcare",
  "education",
  "environment",
  "civilLiberties",
  "foreignPolicy",
  "technology",
  "social",
] as const;

export function scoreMap(value: number): Record<string, number> {
  return Object.fromEntries(CATEGORY_IDS.map((id) => [id, value]));
}

export function encodeScores(scores: Record<string, number>): string {
  return Buffer.from(JSON.stringify(scores), "utf8").toString("base64");
}

export async function answerVisibleCategory(
  page: Page,
  answerName: "Strongly Agree" | "Neutral / Mixed" = "Strongly Agree"
) {
  for (let index = 1; index <= 4; index += 1) {
    await page.getByRole("button", { name: `Q${index} ${answerName}` }).click();
  }
}

export async function completeQuiz(
  page: Page,
  answerName: "Strongly Agree" | "Neutral / Mixed" = "Strongly Agree"
) {
  await page.goto("/quiz");
  await expect(page.getByRole("heading", { name: "Border Openness" })).toBeVisible();

  for (let category = 0; category < CATEGORY_IDS.length; category += 1) {
    await answerVisibleCategory(page, answerName);
    const buttonName = category === CATEGORY_IDS.length - 1 ? "See My Shape →" : "Next →";
    const nextButton = page.getByRole("button", { name: buttonName, exact: true });
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
  }

  await expect(page).toHaveURL(/\/results\?scores=/);
  await expect(page.getByText("Your political archetype")).toBeVisible();
}
