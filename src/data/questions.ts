import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "immigration",
    name: "Immigration",
    shortName: "Immigration",
    description: "Policies around immigration, border control, and pathways to citizenship.",
    emoji: "🌍",
    positiveLabel: "Pro-inclusive immigration",
    negativeLabel: "Pro-restrictive immigration",
    questions: [
      {
        id: "imm-1",
        categoryId: "immigration",
        text: "Providing legal pathways to citizenship for long-term undocumented residents is fair and beneficial for society.",
      },
      {
        id: "imm-2",
        categoryId: "immigration",
        text: "Immigration overall enriches our culture and economy and should be actively encouraged.",
      },
      {
        id: "imm-3",
        categoryId: "immigration",
        text: "Asylum seekers should be given full legal protections and fair hearings rather than turned away at the border.",
      },
      {
        id: "imm-4",
        categoryId: "immigration",
        text: "Stricter border enforcement measures, such as barriers and increased patrols, do more harm than good.",
      },
    ],
  },
  {
    id: "government",
    name: "Government Role",
    shortName: "Gov. Role",
    description: "The appropriate size and scope of government in public life and the economy.",
    emoji: "🏛️",
    positiveLabel: "Pro-active government",
    negativeLabel: "Limited government",
    questions: [
      {
        id: "gov-1",
        categoryId: "government",
        text: "Government regulation of businesses is essential to protect workers, consumers, and the environment.",
      },
      {
        id: "gov-2",
        categoryId: "government",
        text: "The government has a responsibility to actively reduce economic inequality between citizens.",
      },
      {
        id: "gov-3",
        categoryId: "government",
        text: "A strong social safety net—including unemployment benefits and public housing—is a sign of a healthy society.",
      },
      {
        id: "gov-4",
        categoryId: "government",
        text: "Reducing government spending is less important than ensuring quality public services for everyone.",
      },
    ],
  },
  {
    id: "economy",
    name: "Economy / Taxes",
    shortName: "Economy",
    description: "Tax policy, wealth redistribution, labor rights, and economic regulation.",
    emoji: "💰",
    positiveLabel: "Pro-redistribution",
    negativeLabel: "Pro-free market",
    questions: [
      {
        id: "econ-1",
        categoryId: "economy",
        text: "Wealthy individuals and large corporations should pay significantly higher taxes.",
      },
      {
        id: "econ-2",
        categoryId: "economy",
        text: "Strong labor unions are essential for protecting fair wages and working conditions.",
      },
      {
        id: "econ-3",
        categoryId: "economy",
        text: "Economic inequality is a serious societal problem that requires active government intervention.",
      },
      {
        id: "econ-4",
        categoryId: "economy",
        text: "Free trade agreements that prioritize global commerce over domestic worker protection should be reconsidered.",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    description: "Access to medical care, insurance systems, and pharmaceutical policy.",
    emoji: "🏥",
    positiveLabel: "Pro-universal healthcare",
    negativeLabel: "Pro-private healthcare",
    questions: [
      {
        id: "health-1",
        categoryId: "healthcare",
        text: "Healthcare is a basic human right that the government should guarantee for all citizens.",
      },
      {
        id: "health-2",
        categoryId: "healthcare",
        text: "A government-run universal healthcare system would produce better outcomes than the current private system.",
      },
      {
        id: "health-3",
        categoryId: "healthcare",
        text: "Pharmaceutical companies' ability to set drug prices should be heavily regulated by the government.",
      },
      {
        id: "health-4",
        categoryId: "healthcare",
        text: "No one should face financial hardship or bankruptcy due to medical costs.",
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    shortName: "Education",
    description: "Public schooling, higher education funding, and student debt policy.",
    emoji: "🎓",
    positiveLabel: "Pro-public education",
    negativeLabel: "Pro-school choice / private",
    questions: [
      {
        id: "edu-1",
        categoryId: "education",
        text: "Public universities and colleges should be tuition-free or heavily subsidized for all students.",
      },
      {
        id: "edu-2",
        categoryId: "education",
        text: "The government should significantly increase funding for public K–12 education.",
      },
      {
        id: "edu-3",
        categoryId: "education",
        text: "Student loan debt forgiveness is a fair and necessary policy to address educational inequality.",
      },
      {
        id: "edu-4",
        categoryId: "education",
        text: "A standardized, well-funded public school system produces more equal outcomes than market-based school choice.",
      },
    ],
  },
  {
    id: "environment",
    name: "Environment",
    shortName: "Environment",
    description: "Climate policy, environmental regulation, and energy transition.",
    emoji: "🌱",
    positiveLabel: "Pro-environmental action",
    negativeLabel: "Anti-regulation / growth-first",
    questions: [
      {
        id: "env-1",
        categoryId: "environment",
        text: "Addressing climate change should be among the government's highest priorities, even at economic cost.",
      },
      {
        id: "env-2",
        categoryId: "environment",
        text: "Environmental regulations protecting natural resources are worth the costs to businesses.",
      },
      {
        id: "env-3",
        categoryId: "environment",
        text: "We should rapidly transition away from fossil fuels, even if energy prices rise temporarily.",
      },
      {
        id: "env-4",
        categoryId: "environment",
        text: "Companies causing environmental damage should face strong penalties and mandatory cleanup requirements.",
      },
    ],
  },
  {
    id: "civilLiberties",
    name: "Civil Liberties",
    shortName: "Civil Lib.",
    description: "Individual rights, privacy, free speech, and limits on government power.",
    emoji: "⚖️",
    positiveLabel: "Pro-civil liberties",
    negativeLabel: "Pro-law & order / security",
    questions: [
      {
        id: "civil-1",
        categoryId: "civilLiberties",
        text: "Government surveillance of citizens without clear judicial oversight is a serious threat to freedom.",
      },
      {
        id: "civil-2",
        categoryId: "civilLiberties",
        text: "Law enforcement agencies require strong, independent oversight to prevent abuses of power.",
      },
      {
        id: "civil-3",
        categoryId: "civilLiberties",
        text: "People should be broadly free to make decisions about their own bodies and lifestyles without government restriction.",
      },
      {
        id: "civil-4",
        categoryId: "civilLiberties",
        text: "Free speech protections should cover a wide range of viewpoints, including those considered offensive or controversial.",
      },
    ],
  },
  {
    id: "foreignPolicy",
    name: "War & Peace",
    shortName: "War & Peace",
    description: "Military spending, foreign intervention, diplomacy, and international alliances.",
    emoji: "🕊️",
    positiveLabel: "Pro-diplomacy / non-intervention",
    negativeLabel: "Pro-military strength",
    questions: [
      {
        id: "fp-1",
        categoryId: "foreignPolicy",
        text: "Diplomatic and economic tools should be prioritized over military force in resolving international disputes.",
      },
      {
        id: "fp-2",
        categoryId: "foreignPolicy",
        text: "Military interventions abroad rarely achieve their goals and should generally be avoided.",
      },
      {
        id: "fp-3",
        categoryId: "foreignPolicy",
        text: "International cooperation through alliances and multilateral institutions produces better outcomes than unilateral action.",
      },
      {
        id: "fp-4",
        categoryId: "foreignPolicy",
        text: "Defense spending should be reduced and those funds redirected toward domestic priorities.",
      },
    ],
  },
  {
    id: "technology",
    name: "Tech & Regulation",
    shortName: "Technology",
    description: "Big tech regulation, data privacy, AI oversight, and digital rights.",
    emoji: "💻",
    positiveLabel: "Pro-tech regulation",
    negativeLabel: "Pro-tech freedom",
    questions: [
      {
        id: "tech-1",
        categoryId: "technology",
        text: "Large technology companies have too much power and should face stronger antitrust enforcement.",
      },
      {
        id: "tech-2",
        categoryId: "technology",
        text: "Individuals should have strong legal rights to control how companies collect and use their personal data.",
      },
      {
        id: "tech-3",
        categoryId: "technology",
        text: "Artificial intelligence development requires significant government oversight to prevent societal harm.",
      },
      {
        id: "tech-4",
        categoryId: "technology",
        text: "Social media platforms should be held legally responsible for harmful content that spreads on their networks.",
      },
    ],
  },
  {
    id: "social",
    name: "Social Issues",
    shortName: "Social",
    description: "Equality, identity, reproductive rights, and social justice policy.",
    emoji: "🤝",
    positiveLabel: "Pro-progressive social policy",
    negativeLabel: "Pro-traditional values",
    questions: [
      {
        id: "soc-1",
        categoryId: "social",
        text: "Government policies should actively work to address historical discrimination and systemic inequality.",
      },
      {
        id: "soc-2",
        categoryId: "social",
        text: "Access to reproductive healthcare, including abortion, should be a legally protected right.",
      },
      {
        id: "soc-3",
        categoryId: "social",
        text: "LGBTQ+ individuals deserve full legal equality and strong protection from discrimination.",
      },
      {
        id: "soc-4",
        categoryId: "social",
        text: "Significant reform of policing and criminal justice is needed to address systemic problems.",
      },
    ],
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);
