/**
 * colorUtils.ts
 * -------------
 * Directional shade encoding for the political-shape polygon.
 *
 * Convention
 * ----------
 *  score = +1 (fully progressive)  →  light, vibrant pastel
 *  score =  0 (neutral / unanswered) →  mid (never visible; r = 0)
 *  score = -1 (fully conservative)  →  deep, vibrant dark
 *
 * Saturation is preserved (and slightly boosted at extremes) so neither
 * end looks washed-out or muddy.  The lightness range is wide enough
 * that every intermediate level is visually distinct.
 */

// ── HSL ↔ HEX helpers ────────────────────────────────────────────────────────

function hexToHSL(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;

  const hueToRgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  let r: number;
  let g: number;
  let b: number;

  if (sn === 0) {
    r = g = b = ln;
  } else {
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    r = hueToRgb(p, q, h / 360 + 1 / 3);
    g = hueToRgb(p, q, h / 360);
    b = hueToRgb(p, q, h / 360 - 1 / 3);
  }

  const toHex = (x: number) =>
    Math.round(Math.max(0, Math.min(1, x)) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Target lightness values at the two poles.
 * Tweak these to change the overall palette feel.
 *
 * LIGHT_L = 76  →  soft-but-bold pastel (progressive end)
 * DARK_L  = 26  →  rich vibrant dark    (conservative end)
 */
const LIGHT_L = 76;
const DARK_L = 26;

/**
 * Saturation boost at the extremes — keeps colours vivid without becoming
 * garish.  0 = no boost, 10 = perceptible boost.
 */
const SAT_BOOST = 7;

/**
 * Return the directionally-shaded hex colour for a given base colour and
 * signed axis score.
 *
 * @param baseHex   The dimension's canonical brand colour (e.g. "#E8782E")
 * @param signedScore  Signed axis score in [-1, +1]
 */
export function getDirectionalShade(baseHex: string, signedScore: number): string {
  const [h, s, baseLightness] = hexToHSL(baseHex);
  const t = Math.max(-1, Math.min(1, signedScore));

  // Interpolate lightness
  const targetL =
    t >= 0
      ? baseLightness + (LIGHT_L - baseLightness) * t
      : baseLightness + (baseLightness - DARK_L) * (-t);

  // Slightly boost saturation at strong positions to retain vibrancy
  const targetS = Math.min(100, s + Math.abs(t) * SAT_BOOST);

  return hslToHex(h, targetS, targetL);
}
