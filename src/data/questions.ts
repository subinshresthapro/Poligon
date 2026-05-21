import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "immigration",
    name: "Immigration",
    shortName: "Immigration",
    description: "How open or restricted should movement of people across borders be?",
    emoji: "🌍",
    positiveLabel: "More open / welcoming",
    negativeLabel: "More controlled / restricted",
    questions: [
      {
        id: "imm-1",
        categoryId: "immigration",
        text: "People who have lived and worked in a country for many years, but without official paperwork, should have a realistic way to become permanent residents.",
      },
      {
        id: "imm-2",
        categoryId: "immigration",
        text: "A country generally does better when it allows more people from other places to come and settle there.",
      },
      {
        id: "imm-3",
        categoryId: "immigration",
        text: "Someone who says they are in danger in their home country should get a proper hearing before being sent back.",
      },
      {
        id: "imm-4",
        categoryId: "immigration",
        text: "Spending heavily on physical barriers and patrols along borders causes more harm than it prevents.",
      },
    ],
  },
  {
    id: "government",
    name: "Government Role",
    shortName: "Gov. Role",
    description: "How much should government be involved in managing the economy and public life?",
    emoji: "🏛️",
    positiveLabel: "More active government",
    negativeLabel: "Smaller, limited government",
    questions: [
      {
        id: "gov-1",
        categoryId: "government",
        text: "Without clear rules from the government, many businesses will cut corners on safety, pay, and the environment.",
      },
      {
        id: "gov-2",
        categoryId: "government",
        text: "When a small group of people holds most of the wealth, it becomes the government's job to help balance things out.",
      },
      {
        id: "gov-3",
        categoryId: "government",
        text: "A good society makes sure that people who fall on hard times — through job loss, illness, or bad luck — have somewhere to turn.",
      },
      {
        id: "gov-4",
        categoryId: "government",
        text: "Having good public services like schools, roads, and hospitals matters more than keeping overall government spending low.",
      },
    ],
  },
  {
    id: "economy",
    name: "Economy / Taxes",
    shortName: "Economy",
    description: "How should wealth, taxes, and economic opportunity be distributed?",
    emoji: "💰",
    positiveLabel: "More redistribution & worker protections",
    negativeLabel: "More free-market & lower taxes",
    questions: [
      {
        id: "econ-1",
        categoryId: "economy",
        text: "People and companies that earn the most should pay a larger share of their income in taxes than everyone else.",
      },
      {
        id: "econ-2",
        categoryId: "economy",
        text: "When workers negotiate together as a group, they tend to get fairer pay and safer conditions than when they each deal with employers alone.",
      },
      {
        id: "econ-3",
        categoryId: "economy",
        text: "The growing gap between the highest and lowest earners is a serious problem that the government should actively work to fix.",
      },
      {
        id: "econ-4",
        categoryId: "economy",
        text: "Trade arrangements that allow foreign companies to undercut local workers on wages should be renegotiated or scrapped.",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    description: "Who should be responsible for making sure people can access medical care?",
    emoji: "🏥",
    positiveLabel: "Government-guaranteed access",
    negativeLabel: "Private / market-based system",
    questions: [
      {
        id: "health-1",
        categoryId: "healthcare",
        text: "Getting medical care when you need it should not depend on how much money you have.",
      },
      {
        id: "health-2",
        categoryId: "healthcare",
        text: "A single government-managed health system would take better care of people than leaving it to competing private companies.",
      },
      {
        id: "health-3",
        categoryId: "healthcare",
        text: "The government should have the power to set limits on how much companies can charge for medicine.",
      },
      {
        id: "health-4",
        categoryId: "healthcare",
        text: "Nobody should lose their savings or go into debt simply because they got sick.",
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    shortName: "Education",
    description: "How should schools and higher education be funded and organized?",
    emoji: "🎓",
    positiveLabel: "More public funding & access",
    negativeLabel: "More private / choice-based",
    questions: [
      {
        id: "edu-1",
        categoryId: "education",
        text: "Going to university or college should not leave someone with years or decades of debt to pay off.",
      },
      {
        id: "edu-2",
        categoryId: "education",
        text: "The national government should make sure all public schools are well-funded, regardless of the wealth of the area they are in.",
      },
      {
        id: "edu-3",
        categoryId: "education",
        text: "People who borrowed heavily to pay for their education and are now struggling deserve some form of relief.",
      },
      {
        id: "edu-4",
        categoryId: "education",
        text: "Children do better overall when they all attend a well-funded shared school system, rather than competing for spots at many different schools.",
      },
    ],
  },
  {
    id: "environment",
    name: "Environment",
    shortName: "Environment",
    description: "How urgently should we act on environmental challenges, and at what cost?",
    emoji: "🌱",
    positiveLabel: "Prioritize environmental protection",
    negativeLabel: "Prioritize economic growth",
    questions: [
      {
        id: "env-1",
        categoryId: "environment",
        text: "Protecting the long-term health of the planet's weather and ecosystems should be a top government priority, even if it costs more in the short term.",
      },
      {
        id: "env-2",
        categoryId: "environment",
        text: "Rules that protect clean air, water, and land from damage are worth the burden they place on businesses.",
      },
      {
        id: "env-3",
        categoryId: "environment",
        text: "We should move away from oil, gas, and coal as quickly as possible, even if energy prices go up for a while.",
      },
      {
        id: "env-4",
        categoryId: "environment",
        text: "Companies that pollute or damage the environment should be required to pay for the harm they cause.",
      },
    ],
  },
  {
    id: "civilLiberties",
    name: "Civil Liberties",
    shortName: "Civil Lib.",
    description: "Where is the right balance between individual freedom and collective security?",
    emoji: "⚖️",
    positiveLabel: "More individual freedom",
    negativeLabel: "More security & order",
    questions: [
      {
        id: "civil-1",
        categoryId: "civilLiberties",
        text: "The government should not be allowed to monitor what people do online or on their phones without permission from a judge.",
      },
      {
        id: "civil-2",
        categoryId: "civilLiberties",
        text: "There should be independent bodies — separate from the police themselves — with real power to check how police use their authority.",
      },
      {
        id: "civil-3",
        categoryId: "civilLiberties",
        text: "People should be free to make their own choices about how they live and what they do with their bodies, as long as they are not harming others.",
      },
      {
        id: "civil-4",
        categoryId: "civilLiberties",
        text: "People should be allowed to express views that others find offensive or wrong, as long as no direct harm is involved.",
      },
    ],
  },
  {
    id: "foreignPolicy",
    name: "War & Peace",
    shortName: "War & Peace",
    description: "When should a country use military force, and how much should it spend on defense?",
    emoji: "🕊️",
    positiveLabel: "Diplomacy & non-intervention",
    negativeLabel: "Strong defense & military presence",
    questions: [
      {
        id: "fp-1",
        categoryId: "foreignPolicy",
        text: "Talks and economic pressure should always be tried seriously before a country considers sending its military into a conflict.",
      },
      {
        id: "fp-2",
        categoryId: "foreignPolicy",
        text: "When one country sends troops into another, it usually ends up making the situation worse than it was before.",
      },
      {
        id: "fp-3",
        categoryId: "foreignPolicy",
        text: "Countries working together through shared agreements and institutions tend to solve problems better than when each acts on its own.",
      },
      {
        id: "fp-4",
        categoryId: "foreignPolicy",
        text: "Money currently spent on the military could often do more good if used to improve life at home.",
      },
    ],
  },
  {
    id: "technology",
    name: "Tech & Regulation",
    shortName: "Technology",
    description: "How much should government regulate technology companies and digital life?",
    emoji: "💻",
    positiveLabel: "More oversight & regulation",
    negativeLabel: "Less regulation, more innovation",
    questions: [
      {
        id: "tech-1",
        categoryId: "technology",
        text: "A small number of technology companies have grown so large that the government should step in to limit how much control they have.",
      },
      {
        id: "tech-2",
        categoryId: "technology",
        text: "People should have a clear legal right to know what information companies collect about them — and to say no.",
      },
      {
        id: "tech-3",
        categoryId: "technology",
        text: "The government needs to set firm rules for how AI systems are built and used, before the problems become serious.",
      },
      {
        id: "tech-4",
        categoryId: "technology",
        text: "When harmful or false content spreads widely through an online platform, the company running it should be held responsible.",
      },
    ],
  },
  {
    id: "social",
    name: "Social Issues",
    shortName: "Social",
    description: "How should society handle questions of equality, identity, and justice?",
    emoji: "🤝",
    positiveLabel: "Progressive social change",
    negativeLabel: "Traditional values & stability",
    questions: [
      {
        id: "soc-1",
        categoryId: "social",
        text: "When certain groups have been treated unfairly for a long time, the government should take active steps to help level the playing field.",
      },
      {
        id: "soc-2",
        categoryId: "social",
        text: "The decision to end a pregnancy should be made by the person who is pregnant — not by the government.",
      },
      {
        id: "soc-3",
        categoryId: "social",
        text: "People should have equal legal rights and protections regardless of who they are attracted to or how they identify.",
      },
      {
        id: "soc-4",
        categoryId: "social",
        text: "The way policing and the courts currently work causes serious problems for many communities, and significant changes are needed.",
      },
    ],
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);
