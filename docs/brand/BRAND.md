# Poligon — Brand Handoff
**Direction: Indigo × Wine (de-partisaned)**
*v0.3 · May 2026*

Drop this folder into your repo as `docs/brand/` (or wherever). All the decisions are captured below as tokens you can lift directly into Tailwind, CSS variables, or a JS theme object. **No artifact code from the exploration file ships with your product** — just the values.

---

## 1. Color tokens

### Brand (3)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A0A0A` | Text, hex frame, structural marks |
| `--bone` | `#F1EEE5` | Primary page background (warm, not white) |
| `--bone-2` | `#E5E0D2` | Card / inset surface background |
| `--accent` | `#5560C8` | **Primary action** — CTAs, headline highlight block, polygon inner mark, focus rings |
| `--accent-deep` | `#4450B2` | Accent hover/press state |
| `--secondary` | `#6E2226` | **Emphasis** — logo hex frame, italic emphasis, score numbers, the chop seal |

### Greys / utility

| Token | Hex | Role |
|---|---|---|
| `--muted` | `rgba(10, 10, 10, 0.55)` | Body subdued text on light |
| `--muted-2` | `rgba(10, 10, 10, 0.35)` | Captions, label-mono |
| `--rule` | `rgba(10, 10, 10, 0.12)` | Hairline borders, dividers |
| `--muted-dark` | `rgba(241, 238, 229, 0.55)` | Body subdued on ink |

### Ten dimension colors (data palette)

Use these for radar wedges, chips, dimension badges. They live in their own world — same lightness/chroma family, hue rotated — so they harmonize when stacked together in a polygon.

| Dimension | Token | Hex |
|---|---|---|
| Immigration | `--d-immigration` | `#E8782E` |
| Gov. Role | `--d-government` | `#8FA82E` |
| Economy | `--d-economy` | `#D4A53C` |
| Healthcare | `--d-healthcare` | `#B8385E` |
| Education | `--d-education` | `#8B4FCB` |
| Environment | `--d-environment` | `#3AA361` |
| Civil Liberties | `--d-civil` | `#4257C9` |
| War & Peace | `--d-war` | `#2EA39C` |
| Technology | `--d-tech` | `#3A8DD8` |
| Social | `--d-social` | `#D63D8F` |

---

## 2. Typography

| Role | Family | Weight | Size / Notes |
|---|---|---|---|
| Display | **Outfit** | 700 | 56–96px, letter-spacing −0.035em, line-height 0.95 |
| Heading | Outfit | 600 | 28–36px, letter-spacing −0.02em |
| Body | Outfit | 400 | 16–17px, line-height 1.5–1.6 |
| Data / score / caption | **JetBrains Mono** | 400–500 | 10–18px, letter-spacing 0.04–0.14em, often uppercase |
| Editorial emphasis | **Instrument Serif** | 400 italic | Use sparingly — e.g. *"shape"*, *"one-"* |

**Font import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

---

## 3. The polygon (radar)

- **Fill: per-dimension wedges.** Each adjacent pair of vertices defines a triangle; fill it with the dimension color of the *leading* vertex.
- **Wedge alpha scales with score** — base `0.55` for `+1`, floor `0.25` for `−1`. Average the two scores adjoining the wedge.
- **No outer polygon outline** — the wedges define the shape. A 0.5px ink stroke between wedges (`rgba(10,10,10,0.10)`) is fine.
- **Vertex dots** — 4.5px circles, fill = dimension color, 1.4px ink stroke.
- **Rings** — 4 concentric circles at 25/50/75/100% radius, `rgba(10,10,10,0.10)`, dashed `2 4` except the outermost ring (solid).
- **Labels (when on)** — emoji + name in Outfit 500, 12px, positioned at `r × 1.22`. Anchor flips based on which side of the radar (start / middle / end).

---

## 4. The logo

- **Mark** = ink hex outline (or `--secondary` wine outline in the "Indigo × Wine" treatment) + accent-filled irregular inner polygon
- **Wordmark** = `Poli` Outfit 700 + `gon` Outfit 400, both ink. Letter-spacing −0.035em.
- **Hex points** (64×64 viewBox): `32,3  57,17.5  57,46.5  32,61  7,46.5  7,17.5`
- **Inner polygon** (default stylized hint, 64×64 viewBox): `32,16  48,22  46,42  30,48  16,38  20,22`
- **In product**, the inner polygon should be replaced with the user's actual shape once they have one. The hint is only for marketing pages and small avatars.

---

## 5. Drop-in CSS

Copy this into your global stylesheet:

```css
:root {
  /* Brand */
  --ink:           #0A0A0A;
  --bone:          #F1EEE5;
  --bone-2:        #E5E0D2;
  --accent:        #5560C8;
  --accent-deep:   #4450B2;
  --secondary:     #6E2226;

  /* Greys */
  --muted:         rgba(10, 10, 10, 0.55);
  --muted-2:       rgba(10, 10, 10, 0.35);
  --rule:          rgba(10, 10, 10, 0.12);
  --muted-dark:    rgba(241, 238, 229, 0.55);

  /* Ten dimensions */
  --d-immigration: #E8782E;
  --d-government:  #8FA82E;
  --d-economy:     #D4A53C;
  --d-healthcare:  #B8385E;
  --d-education:   #8B4FCB;
  --d-environment: #3AA361;
  --d-civil:       #4257C9;
  --d-war:         #2EA39C;
  --d-tech:        #3A8DD8;
  --d-social:      #D63D8F;

  /* Type stacks */
  --font-display: 'Outfit', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
  --font-serif:   'Instrument Serif', Georgia, serif;
}

body {
  background: var(--bone);
  color: var(--ink);
  font-family: var(--font-display);
}
```

---

## 6. Tailwind config (optional)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ink:       '#0A0A0A',
        bone:      { DEFAULT: '#F1EEE5', 2: '#E5E0D2' },
        accent:    { DEFAULT: '#5560C8', deep: '#4450B2' },
        secondary: '#6E2226',
        d: {
          immigration: '#E8782E',
          government:  '#8FA82E',
          economy:     '#D4A53C',
          healthcare:  '#B8385E',
          education:   '#8B4FCB',
          environment: '#3AA361',
          civil:       '#4257C9',
          war:         '#2EA39C',
          tech:        '#3A8DD8',
          social:      '#D63D8F',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
        serif:   ['Instrument Serif', 'Georgia', 'serif'],
      },
    },
  },
};
```

---

## 7. Rules of thumb

- **Accent fires only at moments that matter** — primary CTA, the chartreuse-equivalent highlight in the headline, the inner polygon. Don't sprinkle it everywhere.
- **Secondary (wine) does emphasis** — score numbers, italic emphasis, the logo hex frame, "view profile" link markers. Treat it like italics: powerful in small doses.
- **Never put accent and secondary at equal weight in the same composition** — that's when the "red vs blue" reading creeps back. One leads, one supports.
- **The polygon is the hero** — brand chrome stays restrained so the user's shape can be the loud, colorful thing.
