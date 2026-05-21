/**
 * Poligon — brand tokens (JS/TS)
 * Direction: Indigo × Wine (v0.3, May 2026)
 *
 * Use for theme objects, chart libraries, runtime color decisions.
 */

export const brand = {
  ink:         '#0A0A0A',
  bone:        '#F1EEE5',
  bone2:       '#E5E0D2',
  accent:      '#5560C8',   // primary action
  accentDeep:  '#4450B2',   // hover/press
  secondary:   '#6E2226',   // emphasis — wine
};

export const muted = {
  text:       'rgba(10, 10, 10, 0.55)',
  caption:    'rgba(10, 10, 10, 0.35)',
  rule:       'rgba(10, 10, 10, 0.12)',
  textOnDark: 'rgba(241, 238, 229, 0.55)',
};

export const dimensions = [
  { id: 'immigration', label: 'Immigration',    emoji: '🌍', color: '#E8782E' },
  { id: 'government',  label: 'Gov. Role',      emoji: '🏛️', color: '#8FA82E' },
  { id: 'economy',     label: 'Economy',        emoji: '💰', color: '#D4A53C' },
  { id: 'healthcare',  label: 'Healthcare',     emoji: '🏥', color: '#B8385E' },
  { id: 'education',   label: 'Education',      emoji: '🎓', color: '#8B4FCB' },
  { id: 'environment', label: 'Environment',    emoji: '🌱', color: '#3AA361' },
  { id: 'civil',       label: 'Civil Liberties',emoji: '⚖️', color: '#4257C9' },
  { id: 'war',         label: 'War & Peace',    emoji: '🕊️', color: '#2EA39C' },
  { id: 'tech',        label: 'Technology',     emoji: '💻', color: '#3A8DD8' },
  { id: 'social',      label: 'Social',         emoji: '🤝', color: '#D63D8F' },
];

export const type = {
  display: `'Outfit', system-ui, -apple-system, sans-serif`,
  mono:    `'JetBrains Mono', ui-monospace, monospace`,
  serif:   `'Instrument Serif', Georgia, serif`,
};

// Polygon rendering parameters
export const polygon = {
  rings: 4,                    // 25/50/75/100% radius
  wedgeAlphaBase: 0.55,        // alpha for score = +1
  wedgeAlphaMin:  0.25,        // alpha for score = -1
  wedgeStroke:    'rgba(10, 10, 10, 0.10)',
  wedgeStrokeWidth: 0.5,
  vertexDot:      { r: 4.5, strokeWidth: 1.4 },
  // Convert a [-1..1] score to radius factor [0.1..1.0]
  scoreToRadius: (v) => 0.10 + ((v + 1) / 2) * 0.90,
};
