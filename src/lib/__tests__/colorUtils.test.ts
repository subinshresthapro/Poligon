import { describe, expect, it } from "vitest";

import { CATEGORIES } from "@/data/questions";
import {
  CATEGORY_LIGHT_DARK,
  getDimensionBrandColor,
  getDirectionalShade,
  getSegmentColor,
  lerpHex,
} from "@/lib/colorUtils";

describe("color utilities", () => {
  it("linearly interpolates hex colors and clamps channel output", () => {
    expect(lerpHex("#000000", "#ffffff", 0)).toBe("#000000");
    expect(lerpHex("#000000", "#ffffff", 0.5)).toBe("#808080");
    expect(lerpHex("#000000", "#ffffff", 1)).toBe("#ffffff");
  });

  it("maps signed scores to dark, midpoint, and light segment colors", () => {
    const palette = CATEGORY_LIGHT_DARK.immigration;

    expect(getSegmentColor("immigration", -1)).toBe(palette.dark.toLowerCase());
    expect(getSegmentColor("immigration", 1)).toBe(palette.light.toLowerCase());
    expect(getSegmentColor("immigration", 0)).toBe(lerpHex(palette.dark, palette.light, 0.5));
    expect(getDimensionBrandColor("immigration")).toBe(getSegmentColor("immigration", 0));
  });

  it("clamps out-of-range signed scores", () => {
    expect(getSegmentColor("government", -99)).toBe(CATEGORY_LIGHT_DARK.government.dark.toLowerCase());
    expect(getSegmentColor("government", 99)).toBe(CATEGORY_LIGHT_DARK.government.light.toLowerCase());
  });

  it("keeps palette entries for every quiz category", () => {
    for (const category of CATEGORIES) {
      expect(CATEGORY_LIGHT_DARK).toHaveProperty(category.id);
    }
  });

  it("uses a stable fallback for unknown categories and legacy shade calls", () => {
    expect(getSegmentColor("unknown", -1)).toBe("#2a3080");
    expect(getSegmentColor("unknown", 1)).toBe("#c4c8f8");
    expect(getDirectionalShade("#ffffff", 0)).toBe(getSegmentColor("unknown", 0));
  });
});
