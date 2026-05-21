# Poligon - The Shape Of Your Politics

A non-partisan civic-tech web application that maps political views as a multidimensional radar chart — showing that political positions are nuanced and don't reduce to a simple left–right axis.

## Live Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/quiz` | 40-question quiz (10 categories × 4 questions) |
| `/results?scores=<encoded>` | Radar chart result + category breakdown |
| `/profiles` | Sample candidate profiles gallery |
| `/profiles/[id]` | Individual profile with embed code |
| `/embed?data=<encoded>` | Embeddable widget (iframe-ready) |
| `/embed?profile=<id>` | Embed a predefined profile |
| `/embed?ideology=<id>` | Embed a predefined ideology shape |

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

## Embedding the Chart

### Option 1: iFrame embed

```html
<iframe
  src="https://your-domain.com/embed?data=BASE64_ENCODED_DATA"
  width="600"
  height="520"
  frameborder="0"
  scrolling="no"
  title="Political Shape"
  style="border:none;max-width:100%;"
></iframe>
```

### Option 2: JavaScript widget

```html
<div
  data-political-shape
  data-name="Candidate A"
  data-scores='{"immigration":0.6,"government":0.65,"economy":0.55,"healthcare":0.8,"education":0.7,"environment":0.85,"civilLiberties":0.6,"foreignPolicy":0.4,"technology":0.55,"social":0.7}'
></div>
<script src="https://your-domain.com/embed.js"></script>
```

### Building the data URL manually

Scores object (all values from **-1.0 to +1.0**):

```json
{
  "name": "Candidate A",
  "scores": {
    "immigration": 0.6,
    "government": 0.65,
    "economy": 0.55,
    "healthcare": 0.8,
    "education": 0.7,
    "environment": 0.85,
    "civilLiberties": 0.6,
    "foreignPolicy": 0.4,
    "technology": 0.55,
    "social": 0.7
  }
}
```

Encode it:
```javascript
const data = btoa(JSON.stringify(payload));
const url = `https://your-domain.com/embed?data=${encodeURIComponent(data)}`;
```

### Embed predefined profiles/ideologies

```html
<!-- Predefined sample candidate -->
<iframe src="https://your-domain.com/embed?profile=candidate-a" ...></iframe>

<!-- Predefined ideology -->
<iframe src="https://your-domain.com/embed?ideology=libertarian" ...></iframe>
```

Available ideology IDs: `progressive`, `conservative`, `libertarian`, `populist`, `centrist`, `green`
Available profile IDs: `candidate-a`, `candidate-b`, `candidate-c`, `candidate-d`, `candidate-e`

## Score Scale

| Score | Meaning |
|---|---|
| +1.0 | Strongly Supports |
| +0.5 | Leans Supportive |
| 0.0 | Neutral / Mixed |
| -0.5 | Leans Opposed |
| -1.0 | Strongly Opposes |

## Editing Questions

All questions and categories live in `src/data/questions.ts`. Each category has 4 questions. To add, remove, or edit questions:

```typescript
// src/data/questions.ts
{
  id: "my-question",
  categoryId: "immigration", // must match a category id
  text: "Your question text here.",
}
```

## Project Structure

```
src/
  app/
    (main)/          # Main app layout with header/footer
      page.tsx       # Landing page
      quiz/          # 40-question quiz
      results/       # Radar chart results
      profiles/      # Sample profile gallery + detail
    embed/           # Standalone iframe-embeddable widget
  components/
    PoliticalRadarChart.tsx      # Core radar chart (Recharts)
    QuestionCard.tsx             # Quiz question with 5 answer options
    CategoryBreakdown.tsx        # Expandable per-category score bars
    IdeologyComparisonPanel.tsx  # Overlay ideology shapes
    ShareExportPanel.tsx         # Share link / iframe / JS snippet
    IdeologyGallery.tsx          # Landing page ideology showcase
    ScoreLegend.tsx              # Score legend (-1 to +1)
  data/
    questions.ts     # Question bank (10 categories x 4 questions)
    ideologies.ts    # 6 ideology archetype shapes
    profiles.ts      # 5 sample candidate profiles
  lib/
    scoring.ts       # Score calculation utilities
    embed.ts         # Embed URL/snippet builders
  types/
    index.ts         # TypeScript interfaces
public/
  embed.js           # JavaScript widget loader
```
