import { Category } from "@/types";

/**
 * SCORING CONVENTION
 * ------------------
 * Each category has 2 "P" (progressive-framed) questions and 2 "C"
 * (conservative-framed) questions.  C questions carry `reverseScore: true`.
 * The scoring layer flips their sign before averaging, so that:
 *
 *   +1  →  strongly progressive / reform end of this axis
 *   −1  →  strongly conservative / traditional end of this axis
 *
 * A committed conservative and a committed progressive both produce
 * large, full polygons — they just differ in *shape*, not overall size.
 */
export const CATEGORIES: Category[] = [
  {
    id: "immigration",
    name: "Border Openness",
    shortName: "Border",
    description: "How open or controlled should movement of people across borders be?",
    emoji: "🌍",
    positiveLabel: "Open & welcoming",
    negativeLabel: "Strict border control",
    questions: [
      {
        id: "imm-1",
        categoryId: "immigration",
        // P — agree = progressive
        text: "People who have lived and worked here for many years without legal status deserve a clear, achievable path to permanent residency.",
      },
      {
        id: "imm-2",
        categoryId: "immigration",
        // C — agree = conservative
        reverseScore: true,
        text: "A country has the right and responsibility to strictly control who crosses its borders, regardless of the circumstances.",
      },
      {
        id: "imm-3",
        categoryId: "immigration",
        // P — agree = progressive
        text: "Asylum seekers should receive a full legal hearing before any deportation decision is made.",
      },
      {
        id: "imm-4",
        categoryId: "immigration",
        // C — agree = conservative
        reverseScore: true,
        text: "High levels of immigration put too much pressure on public services, wages, and social cohesion.",
      },
    ],
  },
  {
    id: "government",
    name: "State vs. Market",
    shortName: "Gov. Role",
    description: "How much should government be involved in managing the economy and public life?",
    emoji: "🏛️",
    positiveLabel: "Active government",
    negativeLabel: "Free market",
    questions: [
      {
        id: "gov-1",
        categoryId: "government",
        // P — agree = progressive
        text: "The government has a responsibility to ensure a basic standard of living for all citizens, even if it means higher taxes.",
      },
      {
        id: "gov-2",
        categoryId: "government",
        // C — agree = conservative
        reverseScore: true,
        text: "When government tries to solve social problems, it usually creates more dependency and inefficiency than it fixes.",
      },
      {
        id: "gov-3",
        categoryId: "government",
        // P — agree = progressive
        text: "Essential services like water, transit, and energy are too important to be left entirely to private profit motives.",
      },
      {
        id: "gov-4",
        categoryId: "government",
        // C — agree = conservative
        reverseScore: true,
        text: "Most regulations on businesses end up hurting the very workers and consumers they're meant to protect.",
      },
    ],
  },
  {
    id: "economy",
    name: "Economic Equality",
    shortName: "Economy",
    description: "How should wealth, taxes, and economic opportunity be distributed?",
    emoji: "💰",
    positiveLabel: "Redistribution & equality",
    negativeLabel: "Low taxes & free market",
    questions: [
      {
        id: "econ-1",
        categoryId: "economy",
        // P — agree = progressive
        text: "The gap between the wealthy and everyone else has grown too large and requires active policy intervention.",
      },
      {
        id: "econ-2",
        categoryId: "economy",
        // C — agree = conservative
        reverseScore: true,
        text: "People who work hard and take risks deserve to keep the rewards. High taxes on success reduce the incentive to create.",
      },
      {
        id: "econ-3",
        categoryId: "economy",
        // P — agree = progressive
        text: "A minimum wage that keeps pace with living costs is a basic protection every worker deserves.",
      },
      {
        id: "econ-4",
        categoryId: "economy",
        // C — agree = conservative
        reverseScore: true,
        text: "Free markets, not government redistribution, are the most reliable engine for lifting people out of poverty.",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Universal vs. Private Care",
    shortName: "Healthcare",
    description: "Who should be responsible for making sure people can access medical care?",
    emoji: "🏥",
    positiveLabel: "Universal coverage",
    negativeLabel: "Private & market-based",
    questions: [
      {
        id: "health-1",
        categoryId: "healthcare",
        // P — agree = progressive
        text: "Everyone should have access to healthcare regardless of their ability to pay. It is a basic right.",
      },
      {
        id: "health-2",
        categoryId: "healthcare",
        // C — agree = conservative
        reverseScore: true,
        text: "When government controls healthcare, quality goes down and wait times go up. Competition produces better outcomes.",
      },
      {
        id: "health-3",
        categoryId: "healthcare",
        // P — agree = progressive
        text: "Pharmaceutical companies should face price controls to prevent them from charging unaffordable prices for essential drugs.",
      },
      {
        id: "health-4",
        categoryId: "healthcare",
        // C — agree = conservative
        reverseScore: true,
        text: "People should be free to choose and pay for their own healthcare coverage rather than being enrolled in a government program.",
      },
    ],
  },
  {
    id: "education",
    name: "Public vs. School Choice",
    shortName: "Education",
    description: "How should schools and higher education be funded and organized?",
    emoji: "🎓",
    positiveLabel: "Strong public schools",
    negativeLabel: "School choice & private",
    questions: [
      {
        id: "edu-1",
        categoryId: "education",
        // P — agree = progressive
        text: "Investing heavily in public schools is the best way to give every child an equal start in life.",
      },
      {
        id: "edu-2",
        categoryId: "education",
        // C — agree = conservative
        reverseScore: true,
        text: "Parents should have the freedom to direct their education funding to any school, public, private, or religious, that best fits their child.",
      },
      {
        id: "edu-3",
        categoryId: "education",
        // P — agree = progressive
        text: "Higher education should be free or heavily subsidized so that cost is never a barrier to attending college.",
      },
      {
        id: "edu-4",
        categoryId: "education",
        // C — agree = conservative
        reverseScore: true,
        text: "Student loan forgiveness is unfair to people who either didn't go to college or already paid off their loans.",
      },
    ],
  },
  {
    id: "environment",
    name: "Climate Action",
    shortName: "Climate",
    description: "How urgently should we act on environmental challenges, and at what cost?",
    emoji: "🌱",
    positiveLabel: "Protect environment",
    negativeLabel: "Economic growth first",
    questions: [
      {
        id: "env-1",
        categoryId: "environment",
        // P — agree = progressive
        text: "Transitioning away from fossil fuels is urgent enough to justify significant economic disruption and cost.",
      },
      {
        id: "env-2",
        categoryId: "environment",
        // C — agree = conservative
        reverseScore: true,
        text: "Environmental regulations often go too far, harming industries and workers without proportionate benefit.",
      },
      {
        id: "env-3",
        categoryId: "environment",
        // P — agree = progressive
        text: "The government should set strict emissions limits on corporations even if it raises consumer prices.",
      },
      {
        id: "env-4",
        categoryId: "environment",
        // C — agree = conservative
        reverseScore: true,
        text: "Technological innovation, not regulation, is the most effective long-term solution to environmental problems.",
      },
    ],
  },
  {
    id: "civilLiberties",
    name: "Individual Freedom",
    shortName: "Civil Lib.",
    description: "Where is the right balance between individual freedom and collective security?",
    emoji: "⚖️",
    positiveLabel: "Civil liberties",
    negativeLabel: "Security & order",
    questions: [
      {
        id: "civil-1",
        categoryId: "civilLiberties",
        // P — agree = progressive
        text: "The government too often uses national security as a justification for surveillance that violates civil liberties.",
      },
      {
        id: "civil-2",
        categoryId: "civilLiberties",
        // C — agree = conservative
        reverseScore: true,
        text: "Law enforcement needs strong tools, including surveillance and stop-and-search powers, to keep communities safe.",
      },
      {
        id: "civil-3",
        categoryId: "civilLiberties",
        // P — agree = progressive
        text: "Laws that restrict access to abortion infringe on a person's right to make decisions about their own body.",
      },
      {
        id: "civil-4",
        categoryId: "civilLiberties",
        // C — agree = conservative
        reverseScore: true,
        text: "The right to own a firearm for self-defense is a fundamental individual liberty that should not be heavily restricted.",
      },
    ],
  },
  {
    id: "foreignPolicy",
    name: "Military Engagement",
    shortName: "War & Peace",
    description: "When should a country use military force, and how much should it spend on defense?",
    emoji: "🕊️",
    positiveLabel: "Diplomacy first",
    negativeLabel: "Strong defense",
    questions: [
      {
        id: "fp-1",
        categoryId: "foreignPolicy",
        // P — agree = progressive
        text: "Military spending should be significantly reduced and redirected toward diplomacy and international development.",
      },
      {
        id: "fp-2",
        categoryId: "foreignPolicy",
        // C — agree = conservative
        reverseScore: true,
        text: "A strong military is the most reliable deterrent against aggression. Underfunding it invites conflict.",
      },
      {
        id: "fp-3",
        categoryId: "foreignPolicy",
        // P — agree = progressive
        text: "The United States should avoid military intervention in foreign conflicts unless directly attacked.",
      },
      {
        id: "fp-4",
        categoryId: "foreignPolicy",
        // C — agree = conservative
        reverseScore: true,
        text: "America has a responsibility to use its military power to defend democracy and human rights around the world.",
      },
    ],
  },
  {
    id: "technology",
    name: "Tech Regulation",
    shortName: "Technology",
    description: "How much should government regulate technology companies and digital life?",
    emoji: "💻",
    positiveLabel: "More oversight",
    negativeLabel: "Less regulation",
    questions: [
      {
        id: "tech-1",
        categoryId: "technology",
        // P — agree = progressive
        text: "Large tech platforms have too much unchecked power and need strong government regulation.",
      },
      {
        id: "tech-2",
        categoryId: "technology",
        // C — agree = conservative
        reverseScore: true,
        text: "Government intervention in the tech sector risks stifling the innovation that has driven economic growth.",
      },
      {
        id: "tech-3",
        categoryId: "technology",
        // P — agree = progressive
        text: "People should have the legal right to know what data companies collect about them and how it is used.",
      },
      {
        id: "tech-4",
        categoryId: "technology",
        // C — agree = conservative
        reverseScore: true,
        text: "Content moderation by platforms is a form of censorship; platforms should face legal consequences for removing lawful speech.",
      },
    ],
  },
  {
    id: "social",
    name: "Cultural Change",
    shortName: "Social",
    description: "How should society handle questions of identity, equity, and historical injustice?",
    emoji: "🤝",
    positiveLabel: "Progressive change",
    negativeLabel: "Traditional values",
    questions: [
      {
        id: "soc-1",
        categoryId: "social",
        // P — agree = progressive
        text: "Diversity in leadership and institutions makes them more effective and representative.",
      },
      {
        id: "soc-2",
        categoryId: "social",
        // C — agree = conservative
        reverseScore: true,
        text: "Placing too much emphasis on group identity divides society rather than uniting it around shared values.",
      },
      {
        id: "soc-3",
        categoryId: "social",
        // P — agree = progressive
        text: "Historical injustices have created present-day disadvantages that society has a responsibility to actively correct.",
      },
      {
        id: "soc-4",
        categoryId: "social",
        // C — agree = conservative
        reverseScore: true,
        text: "Individuals should be judged entirely on their own actions and merits. Group membership should play no role in decisions.",
      },
    ],
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);
