@AGENTS.md

# Poligon — Your Political Shape

## What is Poligon?
A political typology quiz that maps your views across 10 independent dimensions and renders them as a unique polygon shape. The goal is to move beyond the left-right binary and show that political identity is genuinely multidimensional.

**Live branch:** `claude/political-shape-app-fKn3q`  
**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · React 19 · Tailwind CSS v4  
**Storage:** localStorage only — no backend, no database, no user data collected.

---

## Core Scoring System (`src/lib/scoring.ts`)

- **40 questions** across 10 categories (4 per category).
- Each category has **2 progressive-framed (P) and 2 conservative-framed (C) questions**.
- C questions carry `reverseScore: true` — the scoring layer multiplies the raw answer by −1 before averaging. This ensures a committed conservative who strongly agrees with conservative-framed questions scores −1 (not 0).
- Final scores normalised to **[−1, +1]** where:
  - `+1` = strongly progressive / reform on this axis
  - `−1` = strongly conservative / traditional on this axis
  - `0`  = neutral or unanswered

**Key insight:** spoke LENGTH = `Math.abs(score)` (conviction strength, direction-neutral). Both a strong progressive and a strong conservative produce a full polygon — they differ in *shade*, not *size*.

---

## Color System (`src/lib/colorUtils.ts`)

- `CATEGORY_LIGHT_DARK`: explicit `{ light, dark }` hex pairs keyed by category ID.
  - `light` = progressive end (light pastel)
  - `dark`  = conservative end (deep rich dark)
- `lerpHex(colorA, colorB, t)`: RGB linear interpolation — no HSL weirdness.
- `getSegmentColor(categoryId, score)`: maps `score ∈ [−1, +1]` → hex. Conservative = dark, progressive = light.
- `getDimensionBrandColor(categoryId)`: midpoint (score=0) for decorative elements.

### Hue wheel (no adjacent clashes)
`orange → green → deep yellow → pink → sky blue → teal → violet → blue → purple → lime`

---

## Polygon Rendering

### `PoligonShape` (SVG, `src/components/PoligonShape.tsx`)
- 10-spoke SVG polygon.
- Spoke radius = `Math.abs(score) * maxR`.
- Wedge fill = `getSegmentColor(cat.id, score)`.
- `DIMENSION_COLORS`: dynamically derived midpoints via `getDimensionBrandColor()` — never manually maintained.

### `PoliticalRadarChart` (Canvas, `src/components/PoliticalRadarChart.tsx`)
- Canvas-based, no Recharts/Chart.js dependency.
- Exports `drawPoligonOnCtx(ctx, size, scores, overlays, compact, bgColor?)` — pure function.
- Exports `exportPoligonPNG(scores, { size?, bgColor? })` — off-screen 2× canvas → data-URI.
- **Personalised axis labels**: shows the pole label matching the user's actual lean (|score| > 0.15). No label when near-neutral.
- Legend strip: "Dark = conservative · Light = progressive" always visible.
- Tooltip on hover: axis name, score, pole label.

---

## Data Files

| File | Contents |
|---|---|
| `src/data/questions.ts` | 10 categories × 4 questions; balanced P/C framing; `reverseScore` flag |
| `src/data/ideologies.ts` | 6 ideology profiles with scores + traits |
| `src/data/profiles.ts` | 5 fictional candidate profiles |
| `src/data/politicians.ts` | 6 real politician estimated scores with sources |
| `src/lib/archetypes.ts` | 12 archetypes matched by Euclidean distance in 10D score space |

### Category IDs (in quiz order)
`immigration` · `government` · `economy` · `healthcare` · `education` · `environment` · `civilLiberties` · `foreignPolicy` · `technology` · `social`

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/quiz` | 40-question quiz (10 categories × 4 questions) |
| `/results` | User polygon + breakdown + ideology comparison + share |
| `/compare` | Side-by-side polygon comparison with a friend |
| `/profiles` | Compare against candidate profiles |
| `/about` | Why Poligon exists + How the polygon is built |
| `/embed` | Embeddable widget |

---

## Key Components

| Component | Role |
|---|---|
| `QuizLiveShape` | Sidebar polygon that updates live as the user answers; calls `onViewResults` callback (never a bare `<Link>`) to ensure scores are encoded in the URL |
| `QuizFloatingShape` | Mobile FAB polygon; same `onViewResults` pattern |
| `IdeologyComparisonPanel` | Side-by-side grid of shade-encoded `PoligonShape` cards; shows overlap % per ideology |
| `CompareShape` | Two shade-encoded polygons overlaid (Person A full opacity, Person B ~52 % opacity) |
| `ShareExportPanel` | Copy link · iFrame · JS snippet · PNG download |
| `CategoryBreakdown` | Per-axis score bars; shows conviction % + LeanBadge, not signed numbers |
| `ScoreLegend` | Explains spoke-length and shade encoding |
| `LeanBadge` | Inline badge showing "Reform", "Traditional", or "Mixed" with neutral color coding |
| `ConvictionBar` | Progress bar showing conviction strength (0–100%) with category color fill |

---

## Important Conventions

- **No `getDirectionalShade()` in new code** — deprecated shim; use `getSegmentColor(categoryId, score)`.
- **`DIMENSION_COLORS` is always derived**, never hardcoded — defined as `Object.fromEntries(CATEGORIES.map(c => [c.id, getDimensionBrandColor(c.id)]))`.
- **Quiz → Results flow**: `goToResults()` in `quiz/page.tsx` calls `answersToScores()`, `saveScores()`, then `router.push('/results?scores=<encoded>')`. All navigation from quiz to results must go through this function — not a bare `<Link href="/results">`.
- **No direction bias in polygon size**: spoke radius uses `Math.abs(score)`. A score of −1 and +1 both produce a full-length spoke.

## Score Display System

**Never show raw signed scores (e.g. `-0.93` or `+0.50`) in the UI.** A negative sign on a conservative score reads as a value judgment. Always display two neutral, separated pieces of information:

| Display | Source | Meaning |
|---|---|---|
| **Conviction %** | `convictionPercent(score)` = `Math.round(Math.abs(score) * 100)` | How strongly the user holds this view (0–100, always positive) |
| **Lean label** | `leanLabel(score)` → `"Reform" \| "Traditional" \| "Mixed"` | Which direction they lean (threshold: `\|score\| < 0.15` = Mixed) |

### Helper functions (all in `src/lib/scoring.ts`)
```ts
convictionPercent(score: number): number        // Math.round(Math.abs(score) * 100)
leanLabel(score: number): "Reform" | "Traditional" | "Mixed"
leanLabelStyle(score: number): { bg, text, darkBg, darkText }  // color tokens for the badge
```

### Components
- **`LeanBadge`** (`src/components/LeanBadge.tsx`) — inline colored badge. Props: `score`, `size?: "sm" | "md"`, `dark?: boolean`
- **`ConvictionBar`** (`src/components/ConvictionBar.tsx`) — progress bar. Props: `score`, `categoryColor?: string`

### Label colors (neutral — neither party owns these words)
- **Reform** — green tint (`#E1F5EE` / `#085041`): favours change and new approaches
- **Traditional** — amber tint (`#FAEEDA` / `#633806`): favours proven approaches and stability
- **Mixed** — muted gray: balanced or context-dependent

### Dot colors for dimension pills
```ts
leanLabel(score) === "Reform"       → "#1E3A5F"   // cool dark blue
leanLabel(score) === "Traditional"  → "#C2440A"   // warm terracotta
// Mixed                            → "rgba(10,10,10,0.25)"
```

### What NOT to change
- Signed scores passed **to** `PoligonShape` — the visual uses them internally; do not convert
- Archetype matching in `src/lib/archetypes.ts` — reads signed scores internally, correct
- `scoreLabel()` / `scoreLabelColor()` may still exist in `scoring.ts` but are not used in the UI — do not add new uses of them

---

## Feature History (reverse chronological)

| Date | Feature |
|---|---|
| 2026-05 | Score display redesign: replaced all signed ±0.xx displays with conviction % + Reform/Traditional/Mixed lean badges |
| 2025-05 | Social share buttons (X, Facebook, WhatsApp, Reddit, LinkedIn, Telegram) in results page |
| 2025-05 | About page "How It Works" section with methodology + sources |
| 2025-05 | Personalised radar axis labels (one label matching user's actual lean, not both poles) + dark/light legend strip |
| 2025-05 | Side-by-side ideology cards replace overlay radar; overlap % per ideology |
| 2025-05 | Per-dimension explicit light/dark palette; 10 hues with no adjacent clashes |
| 2025-05 | Quiz navigation: primary button always "Next →"; secondary "See my shape" link when all answers complete |
| 2025-05 | `onViewResults` callback pattern in quiz shapes — fixes stale-scores bug |
| 2025-05 | `DIMENSION_COLORS` derived dynamically from `getDimensionBrandColor()` |
| 2025-05 | Balanced 40 questions (2P + 2C per category) with `reverseScore` flag |
| 2025-05 | Canvas-based radar replacing Recharts; PNG export |
