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
  // ── Progressive / Left ──────────────────────────────────────────────────────

  {
    id: "democratic-socialist",
    name: "Democratic Socialist",
    emoji: "✊",
    description: "You believe the economy needs fundamental transformation — not just better regulation, but a shift in who owns and controls it.",
    detail: "Democratic Socialists go further than the welfare-state left. They want structural change: worker ownership, radical redistribution, and genuine economic democracy. They see climate breakdown, inequality, and political dysfunction as symptoms of the same system. Their means are democratic — elections, organising, reform — but their ambition is transformation, not tinkering.",
    scores: { immigration: 0.85, government: 0.95, economy: 0.97, healthcare: 0.95, education: 0.90, environment: 0.85, civilLiberties: 0.75, foreignPolicy: 0.70, technology: 0.80, social: 0.90 },
  },
  {
    id: "social-architect",
    name: "Social Architect",
    emoji: "🏗️",
    description: "You believe strong institutions and public investment are the foundation of a fair society.",
    detail: "Social Architects favour active government, universal healthcare, public education, and redistribution — seeing collective investment as the surest path to shared wellbeing.",
    scores: { immigration: 0.60, government: 0.90, economy: 0.80, healthcare: 0.90, education: 0.90, environment: 0.60, civilLiberties: 0.50, foreignPolicy: 0.30, technology: 0.50, social: 0.70 },
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

  // ── Libertarian / Anti-state ─────────────────────────────────────────────────

  {
    id: "anarchist",
    name: "Anarchist",
    emoji: "🏴",
    description: "You believe that hierarchical power — whether state, corporate, or institutional — is the root cause of oppression, and must be dismantled.",
    detail: "Anarchists reject the legitimacy of the state and of capitalist property relations — not to create chaos, but to replace top-down authority with voluntary cooperation, mutual aid, and grassroots self-governance. Unlike libertarians, they see corporate concentration as equally dangerous as government power. They envision a society built from below, not managed from above.",
    scores: { immigration: 0.90, government: -0.97, economy: 0.60, healthcare: 0.50, education: -0.20, environment: 0.70, civilLiberties: 0.97, foreignPolicy: 0.90, technology: 0.30, social: 0.85 },
  },
  {
    id: "left-libertarian",
    name: "Left-Libertarian",
    emoji: "🌀",
    description: "You want freedom from both government overreach and corporate power — a world with less hierarchy and more personal autonomy.",
    detail: "Left-Libertarians share the libertarian scepticism of state power, but extend this to corporate power too. They oppose mass surveillance, military adventurism, and economic coercion by employers — while supporting workers' rights, community welfare, and ecological protection. They distrust concentrated power wherever it sits. Think: civil liberties left, anti-corporate, anti-war.",
    scores: { immigration: 0.70, government: -0.55, economy: 0.35, healthcare: 0.25, education: 0.10, environment: 0.60, civilLiberties: 0.85, foreignPolicy: 0.75, technology: 0.50, social: 0.75 },
  },
  {
    id: "civic-libertarian",
    name: "Civic Libertarian",
    emoji: "🗽",
    description: "Personal freedom — from government overreach and social pressure alike — is your core value.",
    detail: "Civic Libertarians prioritise individual autonomy above most other considerations. They oppose both economic intervention and restrictions on personal choices, and are strongly anti-surveillance. They trust markets and individuals over planners and governments.",
    scores: { immigration: 0.30, government: -0.85, economy: -0.75, healthcare: -0.80, education: -0.50, environment: -0.20, civilLiberties: 0.90, foreignPolicy: 0.60, technology: -0.40, social: 0.20 },
  },

  // ── Liberal / Internationalist ───────────────────────────────────────────────

  {
    id: "classical-liberal",
    name: "Classical Liberal",
    emoji: "📜",
    description: "Free markets, civil liberties, rule of law, and open societies — these are the pillars of your politics.",
    detail: "Classical Liberals stand in the tradition of Locke, Mill, and Montesquieu: free markets, individual rights, democratic institutions, and international engagement are mutually reinforcing. They're distinct from the economic right (which can sacrifice liberties for order) and from progressives (who may sacrifice markets for equality). The liberal order is worth defending — and reforming — not replacing.",
    scores: { immigration: 0.40, government: -0.50, economy: -0.55, healthcare: 0.10, education: 0.15, environment: 0.30, civilLiberties: 0.80, foreignPolicy: 0.40, technology: 0.20, social: 0.25 },
  },
  {
    id: "internationalist-liberal",
    name: "Internationalist Liberal",
    emoji: "🌐",
    description: "You believe open borders, free trade, and global institutions produce better outcomes than nationalism and protectionism.",
    detail: "Internationalist Liberals are enthusiastic about global cooperation: they believe that the free movement of people, goods, and ideas makes the world richer, safer, and more innovative. They support multilateral institutions, international agreements on climate and trade, and cosmopolitan values. They're not radical on domestic policy — their primary passion is the architecture of international cooperation.",
    scores: { immigration: 0.90, government: 0.10, economy: -0.25, healthcare: 0.30, education: 0.40, environment: 0.60, civilLiberties: 0.55, foreignPolicy: 0.70, technology: 0.35, social: 0.55 },
  },
  {
    id: "peace-advocate",
    name: "Peace Advocate",
    emoji: "🕊️",
    description: "Diplomacy, non-intervention, and global cooperation define your approach to the world.",
    detail: "Peace Advocates believe strongly in resolving conflicts through dialogue and multilateral frameworks rather than military force — often combined with strong civil liberties values.",
    scores: { immigration: 0.50, government: 0.30, economy: 0.20, healthcare: 0.40, education: 0.40, environment: 0.50, civilLiberties: 0.75, foreignPolicy: 0.90, technology: 0.30, social: 0.50 },
  },

  // ── Centrist ─────────────────────────────────────────────────────────────────

  {
    id: "civic-pragmatist",
    name: "Civic Pragmatist",
    emoji: "🧭",
    description: "You evaluate each issue on its own merits, preferring evidence and balance over ideology.",
    detail: "Civic Pragmatists sit near the centre on most issues, sceptical of rigid dogma on either side. They value workable compromise and are comfortable holding mixed views across the political spectrum.",
    scores: { immigration: 0.10, government: 0.10, economy: 0.10, healthcare: 0.20, education: 0.15, environment: 0.30, civilLiberties: 0.30, foreignPolicy: 0.10, technology: 0.20, social: 0.10 },
  },
  {
    id: "techno-realist",
    name: "Techno-Realist",
    emoji: "💡",
    description: "Technology's promise must be matched by thoughtful, evidence-based governance.",
    detail: "Techno-Realists are optimistic about innovation but want robust guardrails. They typically support data privacy rights, AI oversight, and platform accountability, with pragmatic views on most other issues.",
    scores: { immigration: 0.20, government: 0.30, economy: 0.20, healthcare: 0.40, education: 0.45, environment: 0.45, civilLiberties: 0.60, foreignPolicy: 0.20, technology: 0.85, social: 0.35 },
  },

  // ── Cross-partisan Populist ───────────────────────────────────────────────────

  {
    id: "working-class-populist",
    name: "Working Class Populist",
    emoji: "🔨",
    description: "You're sceptical of elites and institutions, and fiercely protective of working people.",
    detail: "Working Class Populists distrust concentrated power — corporate or governmental — and prioritise economic protection for ordinary workers, often with more traditional views on culture and borders.",
    scores: { immigration: -0.50, government: 0.30, economy: 0.65, healthcare: 0.65, education: 0.35, environment: 0.10, civilLiberties: 0.15, foreignPolicy: 0.40, technology: 0.55, social: -0.30 },
  },
  {
    id: "nationalist-populist",
    name: "Nationalist Populist",
    emoji: "🔥",
    description: "You're fed up with a political class that has put globalism and corporate interests above ordinary people and national culture.",
    detail: "Nationalist Populists distrust both the liberal left and the traditional right — seeing them as two wings of the same establishment. They want government that genuinely protects national culture, controls borders, and puts local workers first. They're often economically interventionist but culturally and socially conservative. This is not old-school conservatism: it's something angrier and more anti-elite.",
    scores: { immigration: -0.90, government: 0.20, economy: 0.30, healthcare: 0.30, education: 0.05, environment: -0.40, civilLiberties: -0.30, foreignPolicy: -0.40, technology: 0.30, social: -0.70 },
  },

  // ── Conservative / Right ──────────────────────────────────────────────────────

  {
    id: "moderate-conservative",
    name: "Moderate Conservative",
    emoji: "🏦",
    description: "You believe in fiscal responsibility, competitive markets, and limited government — while accepting that some public services and safety nets are worth having.",
    detail: "Moderate Conservatives are the pragmatic centre-right: they favour lower taxes, business-friendly regulation, and individual responsibility — but aren't ideological libertarians. They accept a basic welfare state, value stable institutions, and are sceptical of rapid change in any direction. They're the natural home of the voter who wants competent, responsible governance without the extremes.",
    scores: { immigration: -0.25, government: -0.45, economy: -0.55, healthcare: -0.30, education: -0.20, environment: -0.15, civilLiberties: 0.10, foreignPolicy: -0.30, technology: -0.15, social: -0.40 },
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
    id: "religious-traditionalist",
    name: "Religious Traditionalist",
    emoji: "⛪",
    description: "Faith, family, and moral tradition form the bedrock of your political worldview.",
    detail: "Religious Traditionalists believe that stable families, faith communities, and shared moral frameworks hold society together. They support parental rights in education, oppose progressive social change, and tend to be more compassionate on poverty than secular conservatives — viewing care for the vulnerable as a moral and religious obligation. Their politics flows from values, not economic theory.",
    scores: { immigration: -0.35, government: -0.20, economy: -0.30, healthcare: 0.10, education: -0.55, environment: -0.10, civilLiberties: -0.30, foreignPolicy: -0.25, technology: -0.35, social: -0.90 },
  },
  {
    id: "national-conservative",
    name: "National Conservative",
    emoji: "🏛️",
    description: "You value tradition, ordered borders, strong defence, and restrained government spending.",
    detail: "National Conservatives emphasise national sovereignty, cultural continuity, and security — favouring controlled immigration, a strong military, and traditional social institutions.",
    scores: { immigration: -0.80, government: -0.60, economy: -0.50, healthcare: -0.50, education: -0.35, environment: -0.45, civilLiberties: -0.10, foreignPolicy: -0.55, technology: -0.20, social: -0.75 },
  },

  // ── Hawkish / Security ────────────────────────────────────────────────────────

  {
    id: "neo-conservative",
    name: "Neo-Conservative",
    emoji: "🎯",
    description: "You believe your country has a duty to use its power to defend democracy and prevent authoritarianism from taking hold abroad.",
    detail: "Neo-Conservatives believe that military strength and willingness to intervene are the surest guarantors of a stable, democratic world order. They support engagement, alliances, and — when necessary — military action to deter aggressors and support democracies. Domestically they lean centre-right: fiscally conservative, moderately traditional, but less driven by culture-war than by foreign policy conviction.",
    scores: { immigration: -0.10, government: -0.35, economy: -0.45, healthcare: -0.15, education: -0.10, environment: -0.15, civilLiberties: -0.10, foreignPolicy: -0.95, technology: -0.15, social: -0.20 },
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
    id: "authoritarian-statist",
    name: "Authoritarian Statist",
    emoji: "⚙️",
    description: "You believe a strong, decisive state is the only reliable guarantor of order, security, and national cohesion.",
    detail: "Authoritarian Statists prioritise stability, national strength, and social cohesion over individual rights. They support robust executive power, strong law enforcement, and state control of key institutions — even at the cost of civil liberties. This worldview crosses traditional left-right lines: it can be nationalist, state-socialist, or simply a hard-nosed view that strong governance is the precondition for everything else.",
    scores: { immigration: -0.50, government: 0.80, economy: 0.40, healthcare: 0.40, education: 0.30, environment: 0.10, civilLiberties: -0.90, foreignPolicy: -0.60, technology: 0.50, social: -0.60 },
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
