/**
 * colorUtils.ts — Directional colour encoding for the Poligon polygon.
 *
 * Convention
 *   score = +1  (fully progressive)  →  light, vibrant pastel  (LIGHT colour)
 *   score =  0  (neutral)            →  mid-tone between DARK and LIGHT
 *   score = −1  (fully conservative) →  deep, rich dark         (DARK colour)
 *
 * Colours are explicit per-dimension RGB pairs, interpolated linearly in RGB
 * space (not HSL) so the gradients stay vivid and predictable.
 */

// ── Per-dimension colour pairs ────────────────────────────────────────────────
// Keys match the category IDs in src/data/questions.ts.

export const CATEGORY_LIGHT_DARK: Record<string, { light: string; dark: string }> = {
  immigration:    { light: "#FBBF9A", dark: "#C2440A" },
  government:     { light: "#A8D8A0", dark: "#1A5C14" },
  economy:        { light: "#FAD98A", dark: "#8B5A00" },
  healthcare:     { light: "#F7A8C4", dark: "#8B1A45" },
  education:      { light: "#C4B0E8", dark: "#3A1F7A" },
  environment:    { light: "#9FE1CB", dark: "#085041" },
  civilLiberties: { light: "#A8C8F0", dark: "#0C3A6B" },
  foreignPolicy:  { light: "#B0D4E8", dark: "#1A4A6B" },
  technology:     { light: "#B8B8D8", dark: "#2A2A6B" },
  social:         { light: "#FAC8A0", dark: "#8B3A10" },
};

// Fallback for unknown category IDs (indigo pair)
const FALLBACK: { light: string; dark: string } = { light: "#C4C8F8", dark: "#2A3080" };

// ── RGB linear interpolation ──────────────────────────────────────────────────

export function lerpHex(colorA: string, colorB: string, t: number): string {
  const h = (c: string) => parseInt(c, 16);
  const r1 = h(colorA.slice(1, 3)), g1 = h(colorA.slice(3, 5)), b1 = h(colorA.slice(5, 7));
  const r2 = h(colorB.slice(1, 3)), g2 = h(colorB.slice(3, 5)), b2 = h(colorB.slice(5, 7));
  const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
  const x = (v: number) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0");
  return `#${x(lerp(r1, r2, t))}${x(lerp(g1, g2, t))}${x(lerp(b1, b2, t))}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Return the fill colour for a dimension wedge, given its category ID and
 * signed axis score in [−1, +1].
 *
 *   score = +1  →  light (progressive end)
 *   score = −1  →  dark  (conservative end)
 *   score =  0  →  mid-tone
 */
export function getSegmentColor(categoryId: string, score: number): string {
  const { light, dark } = CATEGORY_LIGHT_DARK[categoryId] ?? FALLBACK;
  // Map [−1, +1] → [0, 1] where 0 = conservative (dark), 1 = progressive (light)
  const t = (Math.max(-1, Math.min(1, score)) + 1) / 2;
  return lerpHex(dark, light, t);
}

/**
 * The mid-tone brand colour for a dimension (equivalent to score = 0).
 * Use for pill borders, legend dots, and other decorative elements where
 * a direction-neutral representative colour is needed.
 */
export function getDimensionBrandColor(categoryId: string): string {
  return getSegmentColor(categoryId, 0);
}

/**
 * @deprecated  Use getSegmentColor(categoryId, score) instead.
 * Kept as a thin shim so any stray legacy call sites still compile.
 * The baseHex parameter is ignored — the category ID determines the palette.
 */
export function getDirectionalShade(_baseHex: string, signedScore: number): string {
  // Without a category ID we can only use the generic fallback pair.
  const t = (Math.max(-1, Math.min(1, signedScore)) + 1) / 2;
  return lerpHex(FALLBACK.dark, FALLBACK.light, t);
}
