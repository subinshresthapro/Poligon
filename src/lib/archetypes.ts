import { CATEGORIES } from "@/data/questions";

export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  description: string;
  detail: string;
  scores: Record<string, number>;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "social-architect",
    name: "Social Architect",
    emoji: "🏗️",
    description: "You believe strong institutions and public investment are the foundation of a fair society.",
    detail: "Social Architects favour active government, universal healthcare, public education, and redistribution — seeing collective investment as the surest path to shared wellbeing.",
    scores: { immigration: 0.6, government: 0.90, economy: 0.80, healthcare: 0.90, education: 0.90, environment: 0.60, civilLiberties: 0.50, foreignPolicy: 0.30, technology: 0.50, social: 0.70 },
  },
  {
    id: "green-visionary",
    name: "Green Visionary",
    emoji: "🌿",
    description: "Environmental sustainability and social justice sit at the core of your worldview.",
    detail: "Green Visionaries place climate and ecological protection at the top of their priorities, often connecting environmental action with broader economic and social reform.",
    scores: { immigration: 0.70, government: 0.75, economy: 0.60, healthcare: 0.75, education: 0.70, environment: 0.97, civilLiberties: 0.65, foreignPolicy: 0.50, technology: 0.60, social: 0.85 },
  },
  {
    id: "civil-rights-champion",
    name: "Civil Rights Champion",
    emoji: "⚖️",
    description: "Equality, justice, and protection from discrimination are at the heart of your politics.",
    detail: "Civil Rights Champions believe government has a duty to actively address historical injustice and defend individual freedoms — especially for communities that have faced systemic disadvantage.",
    scores: { immigration: 0.80, government: 0.60, economy: 0.50, healthcare: 0.65, education: 0.70, environment: 0.50, civilLiberties: 0.85, foreignPolicy: 0.40, technology: 0.60, social: 0.95 },
  },
  {
    id: "reform-progressive",
    name: "Reform Progressive",
    emoji: "🔧",
    description: "You believe meaningful change is needed — but through practical, achievable steps.",
    detail: "Reform Progressives want significant improvement in social and economic conditions, but favour pragmatic paths over radical transformation. They typically sit left-of-centre across most dimensions.",
    scores: { immigration: 0.55, government: 0.65, economy: 0.55, healthcare: 0.70, education: 0.65, environment: 0.70, civilLiberties: 0.60, foreignPolicy: 0.35, technology: 0.50, social: 0.65 },
  },
  {
    id: "civic-libertarian",
    name: "Civic Libertarian",
    emoji: "🗽",
    description: "Personal freedom — from government overreach and social pressure alike — is your core value.",
    detail: "Civic Libertarians prioritise individual autonomy above most other considerations. They oppose both economic intervention and restrictions on personal choices, and are strongly anti-surveillance.",
    scores: { immigration: 0.30, government: -0.85, economy: -0.75, healthcare: -0.80, education: -0.50, environment: -0.20, civilLiberties: 0.90, foreignPolicy: 0.60, technology: -0.40, social: 0.20 },
  },
  {
    id: "peace-advocate",
    name: "Peace Advocate",
    emoji: "🕊️",
    description: "Diplomacy, non-intervention, and global cooperation define your approach to the world.",
    detail: "Peace Advocates believe strongly in resolving conflicts through dialogue and multilateral frameworks rather than military force — often combined with strong civil liberties values.",
    scores: { immigration: 0.50, government: 0.30, economy: 0.20, healthcare: 0.40, education: 0.40, environment: 0.50, civilLiberties: 0.75, foreignPolicy: 0.90, technology: 0.30, social: 0.50 },
  },
  {
    id: "civic-pragmatist",
    name: "Civic Pragmatist",
    emoji: "🧭",
    description: "You evaluate each issue on its own merits, preferring evidence and balance over ideology.",
    detail: "Civic Pragmatists sit near the centre on most issues, sceptical of rigid dogma on either side. They value workable compromise and are comfortable holding mixed views.",
    scores: { immigration: 0.10, government: 0.10, economy: 0.10, healthcare: 0.20, education: 0.15, environment: 0.30, civilLiberties: 0.30, foreignPolicy: 0.10, technology: 0.20, social: 0.10 },
  },
  {
    id: "working-class-populist",
    name: "Working Class Populist",
    emoji: "🔨",
    description: "You're sceptical of elites and institutions, and fiercely protective of working people.",
    detail: "Working Class Populists distrust concentrated power — corporate or governmental — and prioritise economic protection for ordinary workers, often with more traditional views on culture and borders.",
    scores: { immigration: -0.50, government: 0.30, economy: 0.65, healthcare: 0.65, education: 0.35, environment: 0.10, civilLiberties: 0.15, foreignPolicy: 0.40, technology: 0.55, social: -0.30 },
  },
  {
    id: "free-market-advocate",
    name: "Free Market Advocate",
    emoji: "📈",
    description: "Economic freedom, low taxation, and minimal regulation are your guiding principles.",
    detail: "Free Market Advocates trust competitive markets over government management, favouring deregulation, reduced taxation, and private-sector solutions to social challenges.",
    scores: { immigration: 0.10, government: -0.80, economy: -0.85, healthcare: -0.75, education: -0.50, environment: -0.45, civilLiberties: 0.30, foreignPolicy: -0.30, technology: -0.65, social: -0.30 },
  },
  {
    id: "national-conservative",
    name: "National Conservative",
    emoji: "🏛️",
    description: "You value tradition, ordered borders, strong defence, and restrained government spending.",
    detail: "National Conservatives emphasise national sovereignty, cultural continuity, and security — favouring controlled immigration, a strong military, and traditional social institutions.",
    scores: { immigration: -0.80, government: -0.60, economy: -0.50, healthcare: -0.50, education: -0.35, environment: -0.45, civilLiberties: -0.10, foreignPolicy: -0.55, technology: -0.20, social: -0.75 },
  },
  {
    id: "security-hawk",
    name: "Security Hawk",
    emoji: "🦅",
    description: "National security, strong defence, and stable order are your primary political concerns.",
    detail: "Security Hawks prioritise military strength, law enforcement, and decisive foreign policy — seeing a robust state apparatus as essential for safety and stability, domestically and abroad.",
    scores: { immigration: -0.65, government: -0.20, economy: -0.30, healthcare: -0.30, education: -0.15, environment: -0.25, civilLiberties: -0.40, foreignPolicy: -0.75, technology: -0.10, social: -0.50 },
  },
  {
    id: "techno-realist",
    name: "Techno-Realist",
    emoji: "💡",
    description: "Technology's promise must be matched by thoughtful, evidence-based governance.",
    detail: "Techno-Realists are optimistic about innovation but want robust guardrails. They typically support data privacy rights, AI oversight, and platform accountability, with pragmatic views on most other issues.",
    scores: { immigration: 0.20, government: 0.30, economy: 0.20, healthcare: 0.40, education: 0.45, environment: 0.45, civilLiberties: 0.60, foreignPolicy: 0.20, technology: 0.85, social: 0.35 },
  },
];

/** Find the closest archetype using Euclidean distance in 10D score space */
export function findArchetype(scores: Record<string, number>): Archetype {
  let closest = ARCHETYPES[0];
  let minDist = Infinity;

  for (const archetype of ARCHETYPES) {
    let dist = 0;
    for (const cat of CATEGORIES) {
      const userScore = scores[cat.id] ?? 0;
      const arcScore = archetype.scores[cat.id] ?? 0;
      dist += (userScore - arcScore) ** 2;
    }
    if (dist < minDist) {
      minDist = dist;
      closest = archetype;
    }
  }
  return closest;
}
