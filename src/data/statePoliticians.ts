import type { PoliticianProfile } from "./politicians";

/**
 * IMPORTANT DISCLAIMER:
 * All scores are approximations for educational purposes only, derived from
 * publicly available voting records (GovTrack, VoteSmart, LegiScan), bill
 * sponsorships, campaign platforms, official policy statements, and political
 * science research (DW-NOMINATE where available). State-level politicians have
 * less published DW-NOMINATE data than federal legislators; their scores rely
 * more heavily on voting history, signed legislation, and stated positions.
 *
 * These estimates do not represent an endorsement of any politician or position.
 * Political views are multidimensional and cannot be perfectly captured numerically.
 */

/**
 * State politicians for the 15 most populous US states.
 * Two politicians per state where data is available (governor + senior senator).
 * Surfaced on the Profiles page when a user's state is detected via IP geolocation.
 *
 * Role priority for display: governor → senator → representative.
 * Seniority (lower = longer-serving) breaks ties between two senators.
 */
export const STATE_POLITICIANS: PoliticianProfile[] = [

  // ── CALIFORNIA (CA) ──────────────────────────────────────────────────────
  {
    id: "gavin-newsom",
    name: "Gavin Newsom",
    title: "Governor of California",
    party: "Democrat",
    country: "United States",
    state: "CA",
    role: "governor",
    description:
      "One of the most prominent progressive governors in the US. Strong climate record, sanctuary-state immigration policy, and a persistent push for universal healthcare in California.",
    sources:
      "California legislative record, signed legislation, Pew Research Center state policy tracking, GovTrack (prior House record).",
    scores: {
      immigration:    0.85,   // sanctuary state, defended DACA, opposed federal enforcement
      government:     0.82,   // activist government across housing, climate, healthcare
      economy:        0.72,   // progressive tax policy, worker protections, minimum wage hikes
      healthcare:     0.82,   // CA universal health push, strong ACA defender
      education:      0.78,   // free community college, public education investment
      environment:    0.92,   // nation-leading EV mandates, 100% clean energy target
      civilLiberties: 0.68,   // police reform, but also broad COVID restrictions
      foreignPolicy:  0.40,   // limited direct role; generally non-interventionist rhetoric
      technology:     0.62,   // CA privacy laws (CCPA), antitrust interest in big tech
      social:         0.90,   // strongly progressive on abortion, LGBTQ, civil rights
    },
  },
  {
    id: "alex-padilla",
    name: "Alex Padilla",
    title: "U.S. Senator (D-CA)",
    party: "Democrat",
    country: "United States",
    state: "CA",
    role: "senator",
    seniority: 1,
    description:
      "First Latino senator from California, appointed 2021. Progressive on immigration, climate, and voting rights. Former California Secretary of State.",
    sources:
      "Senate voting record (GovTrack), bill sponsorships, campaign platforms.",
    scores: {
      immigration:    0.90,   // authored pro-immigration legislation, pathway to citizenship
      government:     0.78,
      economy:        0.72,
      healthcare:     0.85,   // Medicare for All co-sponsor
      education:      0.75,
      environment:    0.80,
      civilLiberties: 0.72,
      foreignPolicy:  0.45,
      technology:     0.65,
      social:         0.85,
    },
  },

  // ── TEXAS (TX) ───────────────────────────────────────────────────────────
  {
    id: "greg-abbott",
    name: "Greg Abbott",
    title: "Governor of Texas",
    party: "Republican",
    country: "United States",
    state: "TX",
    role: "governor",
    description:
      "Strongly conservative governor known for aggressive immigration enforcement (busing migrants, border wall funding), restrictive abortion legislation, and a pro-business regulatory posture.",
    sources:
      "Texas legislative record, signed legislation, Pew Research Center state policy tracking.",
    scores: {
      immigration:    -0.92,  // bused migrants to DC/NY, Operation Lone Star, border wall
      government:     -0.72,  // anti-regulation, pro-business, opposes federal mandates
      economy:        -0.68,  // tax cuts, deregulation, anti-union
      healthcare:     -0.72,  // rejected ACA Medicaid expansion, opposed mandates
      education:      -0.58,  // school voucher program, opposed federal curriculum mandates
      environment:    -0.78,  // pro-fossil fuel, weak climate regulation, withdrew from RGGI
      civilLiberties: -0.52,  // "law and order," anti-protest bills
      foreignPolicy:  -0.45,  // hawkish; supports strong US military posture
      technology:     -0.38,  // generally deregulatory
      social:         -0.85,  // heartbeat abortion bill, anti-LGBTQ legislation
    },
  },
  {
    id: "ted-cruz",
    name: "Ted Cruz",
    title: "U.S. Senator (R-TX)",
    party: "Republican",
    country: "United States",
    state: "TX",
    role: "senator",
    seniority: 1,
    description:
      "One of the Senate's most conservative members. Consistent opponent of government expansion, climate policy, and immigration reform. Led 2021 objections to Electoral College certification.",
    sources:
      "Senate voting record (GovTrack), 2016 presidential campaign platform, published policy positions.",
    scores: {
      immigration:    -0.88,
      government:     -0.85,
      economy:        -0.82,  // major tax cuts, anti-minimum wage hike
      healthcare:     -0.88,  // led effort to repeal ACA
      education:      -0.70,
      environment:    -0.90,  // climate skeptic, pro-fossil fuel, opposed Paris Agreement
      civilLiberties: -0.42,
      foreignPolicy:  -0.52,  // hawkish, strong military spending advocate
      technology:     -0.55,
      social:         -0.85,
    },
  },

  // ── FLORIDA (FL) ─────────────────────────────────────────────────────────
  {
    id: "ron-desantis",
    name: "Ron DeSantis",
    title: "Governor of Florida",
    party: "Republican",
    country: "United States",
    state: "FL",
    role: "governor",
    description:
      "High-profile conservative governor who has signed major legislation targeting immigration, education content, LGBTQ policy, and corporate ESG practices. National profile via 2024 presidential run.",
    sources:
      "Florida legislative record, signed legislation, 2024 presidential campaign platform.",
    scores: {
      immigration:    -0.88,  // migrant relocation flights, anti-sanctuary policies
      government:     -0.65,  // uses government to enforce conservative social norms; complex
      economy:        -0.68,
      healthcare:     -0.75,  // opposed COVID mandates, rejected Medicaid expansion
      education:      -0.75,  // Stop WOKE Act, book removal policies, anti-CRT curriculum
      environment:    -0.70,  // opposed ESG investing, limited climate legislation
      civilLiberties: -0.60,  // anti-protest laws, restrictions on media and protest
      foreignPolicy:  -0.42,  // initially opposed Ukraine aid; later shifted
      technology:     -0.32,  // challenged big tech on content moderation; generally deregulatory
      social:         -0.90,  // don't say gay bill, anti-trans legislation
    },
  },
  {
    id: "rick-scott",
    name: "Rick Scott",
    title: "U.S. Senator (R-FL)",
    party: "Republican",
    country: "United States",
    state: "FL",
    role: "senator",
    seniority: 1,
    description:
      "Former Florida governor and fiscal hawk senator. Proposed sunsetting all federal programs every five years. Hawkish on China, Cuba, and national security.",
    sources:
      "Senate voting record (GovTrack), published policy plans, Florida gubernatorial record.",
    scores: {
      immigration:    -0.80,
      government:     -0.88,  // proposed sunsetting all federal programs; extreme small govt
      economy:        -0.80,
      healthcare:     -0.82,  // proposed cutting Medicare/Social Security
      education:      -0.62,
      environment:    -0.62,
      civilLiberties: -0.42,
      foreignPolicy:  -0.60,  // very hawkish on China, Cuba, Venezuela
      technology:     -0.45,
      social:         -0.75,
    },
  },

  // ── NEW YORK (NY) ────────────────────────────────────────────────────────
  {
    id: "kathy-hochul",
    name: "Kathy Hochul",
    title: "Governor of New York",
    party: "Democrat",
    country: "United States",
    state: "NY",
    role: "governor",
    description:
      "Center-left governor who succeeded Andrew Cuomo. Progressive on climate and social issues, but adopted a more pragmatic posture on immigration and public safety after New York City's migrant crisis.",
    sources:
      "New York legislative record, signed legislation, public statements.",
    scores: {
      immigration:    0.65,   // supportive but adopted pragmatic tone during NYC migrant crisis
      government:     0.72,
      economy:        0.65,
      healthcare:     0.75,
      education:      0.70,
      environment:    0.80,   // signed landmark NY climate law (CLCPA)
      civilLiberties: 0.62,
      foreignPolicy:  0.38,
      technology:     0.55,
      social:         0.80,
    },
  },
  {
    id: "chuck-schumer",
    name: "Chuck Schumer",
    title: "U.S. Senator (D-NY)",
    party: "Democrat",
    country: "United States",
    state: "NY",
    role: "senator",
    seniority: 1,
    description:
      "Senate Democratic leader. Negotiated the Inflation Reduction Act, CHIPS Act, and Bipartisan Infrastructure Law. One of the most powerful legislators in the Democratic Party.",
    sources:
      "Senate voting record (GovTrack), bill sponsorships, Pew Research Center.",
    scores: {
      immigration:    0.68,   // worked on bipartisan reform; supports legal immigration expansion
      government:     0.78,
      economy:        0.72,
      healthcare:     0.80,   // ACA defender, public option advocate
      education:      0.72,
      environment:    0.78,   // IRA primary architect
      civilLiberties: 0.60,
      foreignPolicy:  0.30,   // hawkish on Israel/security compared to party average
      technology:     0.65,
      social:         0.82,
    },
  },

  // ── PENNSYLVANIA (PA) ────────────────────────────────────────────────────
  {
    id: "josh-shapiro",
    name: "Josh Shapiro",
    title: "Governor of Pennsylvania",
    party: "Democrat",
    country: "United States",
    state: "PA",
    role: "governor",
    description:
      "Pragmatic center-left governor and former AG. High-profile 2024 VP shortlist candidate seen as a bridge-builder. Strong on consumer protection, election security, and workforce development.",
    sources:
      "Pennsylvania legislative record, PA Attorney General record, public statements.",
    scores: {
      immigration:    0.58,
      government:     0.65,
      economy:        0.60,
      healthcare:     0.68,
      education:      0.62,
      environment:    0.68,
      civilLiberties: 0.52,   // law-enforcement background as AG tempers some positions
      foreignPolicy:  0.35,
      technology:     0.50,
      social:         0.72,
    },
  },
  {
    id: "john-fetterman",
    name: "John Fetterman",
    title: "U.S. Senator (D-PA)",
    party: "Democrat",
    country: "United States",
    state: "PA",
    role: "senator",
    seniority: 1,
    description:
      "Populist former mayor and lieutenant governor turned senator. Started as a progressive but has notably shifted rightward on immigration and foreign policy since taking office.",
    sources:
      "Senate voting record (GovTrack), public statements, campaign platforms.",
    scores: {
      immigration:    0.38,   // shifted significantly right on border policy post-election
      government:     0.65,
      economy:        0.72,   // working-class champion, pro-labor
      healthcare:     0.82,   // Medicare for All supporter
      education:      0.68,
      environment:    0.65,
      civilLiberties: 0.55,
      foreignPolicy:  -0.12,  // strong pro-Israel stance; more hawkish than party average
      technology:     0.45,
      social:         0.70,
    },
  },

  // ── ILLINOIS (IL) ────────────────────────────────────────────────────────
  {
    id: "jb-pritzker",
    name: "JB Pritzker",
    title: "Governor of Illinois",
    party: "Democrat",
    country: "United States",
    state: "IL",
    role: "governor",
    description:
      "Progressive billionaire governor. Signed sweeping legislation on reproductive rights, gun control, and LGBTQ protections. Vocal national opponent of Trump-era policies.",
    sources:
      "Illinois legislative record, signed legislation, public statements.",
    scores: {
      immigration:    0.80,
      government:     0.78,
      economy:        0.72,
      healthcare:     0.80,
      education:      0.72,
      environment:    0.78,
      civilLiberties: 0.70,
      foreignPolicy:  0.42,
      technology:     0.58,
      social:         0.88,
    },
  },
  {
    id: "dick-durbin",
    name: "Dick Durbin",
    title: "U.S. Senator (D-IL)",
    party: "Democrat",
    country: "United States",
    state: "IL",
    role: "senator",
    seniority: 1,
    description:
      "One of the Senate's longest-serving Democrats and former Whip. Author of the DREAM Act. Chair of the Senate Judiciary Committee with a strong civil liberties and civil rights record.",
    sources:
      "Senate voting record (GovTrack), DW-NOMINATE, bill sponsorships.",
    scores: {
      immigration:    0.75,   // DREAM Act champion, strong pro-immigration record
      government:     0.72,
      economy:        0.70,
      healthcare:     0.80,   // single-payer advocate
      education:      0.72,
      environment:    0.75,
      civilLiberties: 0.80,   // Judiciary Chair, strong civil rights and privacy record
      foreignPolicy:  0.45,
      technology:     0.60,
      social:         0.82,
    },
  },

  // ── OHIO (OH) ────────────────────────────────────────────────────────────
  {
    id: "mike-dewine",
    name: "Mike DeWine",
    title: "Governor of Ohio",
    party: "Republican",
    country: "United States",
    state: "OH",
    role: "governor",
    description:
      "Moderate conservative with a pragmatic streak. More willing than most Republican governors to accept federal funds and acknowledge public health realities. Signed abortion restrictions but pushed for rape/incest exceptions.",
    sources:
      "Ohio legislative record, signed legislation, public statements.",
    scores: {
      immigration:    -0.55,
      government:     -0.55,
      economy:        -0.48,
      healthcare:     -0.42,  // accepted some Medicaid expansion provisions
      education:      -0.45,
      environment:    -0.35,  // more moderate than most GOP governors on environment
      civilLiberties: -0.28,
      foreignPolicy:  -0.42,
      technology:     -0.28,
      social:         -0.62,
    },
  },
  {
    id: "bernie-moreno",
    name: "Bernie Moreno",
    title: "U.S. Senator (R-OH)",
    party: "Republican",
    country: "United States",
    state: "OH",
    role: "senator",
    seniority: 1,
    description:
      "MAGA-aligned senator elected in 2024 with Trump's backing, defeating more moderate Republican candidates. Auto-dealer-turned-politician with strongly conservative positions across the board.",
    sources:
      "Campaign platforms, public statements, VoteSmart.",
    scores: {
      immigration:    -0.85,
      government:     -0.75,
      economy:        -0.72,
      healthcare:     -0.78,
      education:      -0.62,
      environment:    -0.78,
      civilLiberties: -0.52,
      foreignPolicy:  -0.50,
      technology:     -0.48,
      social:         -0.80,
    },
  },

  // ── GEORGIA (GA) ─────────────────────────────────────────────────────────
  {
    id: "brian-kemp",
    name: "Brian Kemp",
    title: "Governor of Georgia",
    party: "Republican",
    country: "United States",
    state: "GA",
    role: "governor",
    description:
      "Traditional conservative Republican who became nationally known for defending Georgia's 2020 election certification against pressure from Trump. More pragmatic than the culture-war wing of the GOP.",
    sources:
      "Georgia legislative record, signed legislation, GovTrack (prior Secretary of State record).",
    scores: {
      immigration:    -0.68,
      government:     -0.62,
      economy:        -0.60,
      healthcare:     -0.65,  // resisted full Medicaid expansion; accepted limited version
      education:      -0.50,
      environment:    -0.52,
      civilLiberties: -0.38,  // upheld rule of law on 2020 election; more moderate here
      foreignPolicy:  -0.45,
      technology:     -0.32,
      social:         -0.65,
    },
  },
  {
    id: "raphael-warnock",
    name: "Raphael Warnock",
    title: "U.S. Senator (D-GA)",
    party: "Democrat",
    country: "United States",
    state: "GA",
    role: "senator",
    seniority: 1,
    description:
      "Civil rights pastor at Ebenezer Baptist Church (Martin Luther King Jr.'s former church). Strong advocate for healthcare access, voting rights, and criminal justice reform.",
    sources:
      "Senate voting record (GovTrack), bill sponsorships, published policy positions.",
    scores: {
      immigration:    0.72,
      government:     0.75,
      economy:        0.72,
      healthcare:     0.85,   // healthcare pastor background; strong ACA and Medicaid advocate
      education:      0.78,
      environment:    0.72,
      civilLiberties: 0.82,   // civil rights background, criminal justice reform
      foreignPolicy:  0.42,
      technology:     0.58,
      social:         0.85,
    },
  },

  // ── NORTH CAROLINA (NC) ──────────────────────────────────────────────────
  {
    id: "josh-stein",
    name: "Josh Stein",
    title: "Governor of North Carolina",
    party: "Democrat",
    country: "United States",
    state: "NC",
    role: "governor",
    description:
      "Former NC Attorney General who won the governorship in 2024. Center-left Democrat focused on Medicaid expansion, education funding, and economic development.",
    sources:
      "NC Attorney General record, campaign platforms, public statements.",
    scores: {
      immigration:    0.55,
      government:     0.65,
      economy:        0.58,
      healthcare:     0.70,   // completed Medicaid expansion as part of transition
      education:      0.62,
      environment:    0.65,
      civilLiberties: 0.58,
      foreignPolicy:  0.38,
      technology:     0.48,
      social:         0.72,
    },
  },
  {
    id: "thom-tillis",
    name: "Thom Tillis",
    title: "U.S. Senator (R-NC)",
    party: "Republican",
    country: "United States",
    state: "NC",
    role: "senator",
    seniority: 1,
    description:
      "Establishment Republican and former NC House Speaker. More willing than most GOP colleagues to engage in bipartisan work, including on immigration reform and NATO support.",
    sources:
      "Senate voting record (GovTrack), bill sponsorships, public statements.",
    scores: {
      immigration:    -0.45,  // worked on bipartisan immigration bill; more moderate here
      government:     -0.60,
      economy:        -0.62,
      healthcare:     -0.65,
      education:      -0.52,
      environment:    -0.45,
      civilLiberties: -0.35,
      foreignPolicy:  -0.52,  // hawkish, strong NATO and Ukraine support
      technology:     -0.38,
      social:         -0.60,
    },
  },

  // ── MICHIGAN (MI) ────────────────────────────────────────────────────────
  {
    id: "gretchen-whitmer",
    name: "Gretchen Whitmer",
    title: "Governor of Michigan",
    party: "Democrat",
    country: "United States",
    state: "MI",
    role: "governor",
    description:
      "Progressive governor with national profile. Signed 100% clean energy legislation, expanded free community college (Michigan Reconnect), and repealed 'right to work' laws. Survived a kidnapping plot in 2020.",
    sources:
      "Michigan legislative record, signed legislation, Pew Research Center.",
    scores: {
      immigration:    0.68,
      government:     0.72,
      economy:        0.70,   // repealed right to work, pro-union
      healthcare:     0.78,
      education:      0.72,   // Michigan Reconnect free community college
      environment:    0.82,   // 100% clean energy by 2040 law
      civilLiberties: 0.70,
      foreignPolicy:  0.42,
      technology:     0.55,
      social:         0.80,
    },
  },
  {
    id: "gary-peters",
    name: "Gary Peters",
    title: "U.S. Senator (D-MI)",
    party: "Democrat",
    country: "United States",
    state: "MI",
    role: "senator",
    seniority: 1,
    description:
      "Pragmatic center-left senator and former Chair of the Homeland Security Committee. Focuses on cybersecurity, manufacturing, and Great Lakes protection.",
    sources:
      "Senate voting record (GovTrack), bill sponsorships.",
    scores: {
      immigration:    0.58,
      government:     0.65,
      economy:        0.65,   // pro-manufacturing, pro-union
      healthcare:     0.72,
      education:      0.68,
      environment:    0.70,   // Great Lakes protection champion
      civilLiberties: 0.58,
      foreignPolicy:  0.32,   // defense/homeland security focus
      technology:     0.65,   // cybersecurity legislation
      social:         0.72,
    },
  },

  // ── NEW JERSEY (NJ) ──────────────────────────────────────────────────────
  {
    id: "andy-kim",
    name: "Andy Kim",
    title: "U.S. Senator (D-NJ)",
    party: "Democrat",
    country: "United States",
    state: "NJ",
    role: "senator",
    seniority: 1,
    description:
      "Former House Representative and NSC official under President Obama who won New Jersey's Senate seat in 2024. National security background with progressive domestic policy positions.",
    sources:
      "House voting record (GovTrack), Senate statements, campaign platforms.",
    scores: {
      immigration:    0.65,
      government:     0.68,
      economy:        0.65,
      healthcare:     0.72,
      education:      0.65,
      environment:    0.72,
      civilLiberties: 0.68,
      foreignPolicy:  0.28,   // national security background; somewhat hawkish
      technology:     0.60,
      social:         0.78,
    },
  },

  // ── VIRGINIA (VA) ────────────────────────────────────────────────────────
  {
    id: "tim-kaine",
    name: "Tim Kaine",
    title: "U.S. Senator (D-VA)",
    party: "Democrat",
    country: "United States",
    state: "VA",
    role: "senator",
    seniority: 2,
    description:
      "Former Virginia governor and Hillary Clinton's 2016 running mate. Center-left senator focused on workforce development, foreign policy oversight, and bipartisan healthcare measures.",
    sources:
      "Senate voting record (GovTrack), DW-NOMINATE, gubernatorial record.",
    scores: {
      immigration:    0.62,
      government:     0.65,
      economy:        0.60,
      healthcare:     0.72,
      education:      0.68,
      environment:    0.70,
      civilLiberties: 0.62,
      foreignPolicy:  0.32,   // supports military but pushed war powers reform
      technology:     0.55,
      social:         0.75,
    },
  },
  {
    id: "mark-warner",
    name: "Mark Warner",
    title: "U.S. Senator (D-VA)",
    party: "Democrat",
    country: "United States",
    state: "VA",
    role: "senator",
    seniority: 1,
    description:
      "Former Virginia governor, tech entrepreneur, and Chair of the Senate Intelligence Committee. Centrist Democrat with a business-friendly economic record and a hawkish national security posture.",
    sources:
      "Senate voting record (GovTrack), Intelligence Committee record, gubernatorial record.",
    scores: {
      immigration:    0.52,
      government:     0.58,
      economy:        0.50,   // business-friendly moderate; more centrist on economic policy
      healthcare:     0.65,
      education:      0.60,
      environment:    0.62,
      civilLiberties: 0.42,   // Intelligence Committee work; more security-focused
      foreignPolicy:  -0.15,  // hawkish on national security, Russia, China
      technology:     0.58,   // major big-tech regulation work, but also tech-industry ties
      social:         0.68,
    },
  },

  // ── WASHINGTON (WA) ──────────────────────────────────────────────────────
  {
    id: "bob-ferguson",
    name: "Bob Ferguson",
    title: "Governor of Washington",
    party: "Democrat",
    country: "United States",
    state: "WA",
    role: "governor",
    description:
      "Former WA Attorney General for 12 years who became governor in 2025. Filed over 100 lawsuits against Trump-era policies. Strong record on consumer protection, environmental enforcement, and tech accountability.",
    sources:
      "WA Attorney General record, signed legislation, public statements.",
    scores: {
      immigration:    0.80,   // challenged Trump immigration executive orders as AG
      government:     0.78,
      economy:        0.70,
      healthcare:     0.75,
      education:      0.72,
      environment:    0.85,   // enforced WA's nation-leading climate laws as AG
      civilLiberties: 0.78,   // consumer protection, civil rights enforcement
      foreignPolicy:  0.42,
      technology:     0.72,   // major tech lawsuits (Google, Amazon) as AG
      social:         0.82,
    },
  },
  {
    id: "maria-cantwell",
    name: "Maria Cantwell",
    title: "U.S. Senator (D-WA)",
    party: "Democrat",
    country: "United States",
    state: "WA",
    role: "senator",
    seniority: 1,
    description:
      "Longtime WA senator and Chair of the Commerce Committee. Strong on climate and ocean policy. Complex relationship with tech industry — represents Amazon and Boeing country but has pushed regulation.",
    sources:
      "Senate voting record (GovTrack), Commerce Committee record.",
    scores: {
      immigration:    0.65,
      government:     0.68,
      economy:        0.62,
      healthcare:     0.72,
      education:      0.68,
      environment:    0.82,   // strong climate and ocean conservation record
      civilLiberties: 0.60,
      foreignPolicy:  0.35,
      technology:     0.52,   // pushed regulation but has ties to tech industry
      social:         0.75,
    },
  },

  // ── ARIZONA (AZ) ─────────────────────────────────────────────────────────
  {
    id: "katie-hobbs",
    name: "Katie Hobbs",
    title: "Governor of Arizona",
    party: "Democrat",
    country: "United States",
    state: "AZ",
    role: "governor",
    description:
      "Former AZ Secretary of State who certified the 2020 election results. Center-left governor navigating a purple state with a pragmatic approach, especially on border and water issues.",
    sources:
      "AZ Secretary of State record, legislative record, public statements.",
    scores: {
      immigration:    0.52,   // more moderate given Arizona's border realities
      government:     0.65,
      economy:        0.58,
      healthcare:     0.72,
      education:      0.65,
      environment:    0.68,
      civilLiberties: 0.62,
      foreignPolicy:  0.38,
      technology:     0.50,
      social:         0.72,
    },
  },
  {
    id: "mark-kelly",
    name: "Mark Kelly",
    title: "U.S. Senator (D-AZ)",
    party: "Democrat",
    country: "United States",
    state: "AZ",
    role: "senator",
    seniority: 1,
    description:
      "Former NASA astronaut and gun control advocate following the Tucson shooting that nearly killed his wife, Rep. Gabby Giffords. Moderate Democrat with a strong military and national security background.",
    sources:
      "Senate voting record (GovTrack), campaign platforms, public statements.",
    scores: {
      immigration:    0.42,   // pragmatic on border given AZ realities; supported some barriers
      government:     0.58,
      economy:        0.55,
      healthcare:     0.68,
      education:      0.60,
      environment:    0.65,
      civilLiberties: 0.52,   // gun control advocate; but national security background
      foreignPolicy:  -0.22,  // former military; notably hawkish for a Democrat
      technology:     0.52,
      social:         0.65,
    },
  },

  // ── MASSACHUSETTS (MA) ───────────────────────────────────────────────────
  {
    id: "maura-healey",
    name: "Maura Healey",
    title: "Governor of Massachusetts",
    party: "Democrat",
    country: "United States",
    state: "MA",
    role: "governor",
    description:
      "First openly lesbian governor in US history and former MA Attorney General. Known for LGBTQ rights advocacy, aggressive climate action, and consumer protection. Progressive across almost all dimensions.",
    sources:
      "MA legislative record, AG record, signed legislation.",
    scores: {
      immigration:    0.80,
      government:     0.78,
      economy:        0.72,
      healthcare:     0.82,
      education:      0.75,
      environment:    0.85,
      civilLiberties: 0.82,   // LGBTQ rights, consumer protection, civil rights as AG
      foreignPolicy:  0.42,
      technology:     0.68,
      social:         0.92,
    },
  },
  {
    id: "elizabeth-warren",
    name: "Elizabeth Warren",
    title: "U.S. Senator (D-MA)",
    party: "Democrat",
    country: "United States",
    state: "MA",
    role: "senator",
    seniority: 1,
    description:
      "One of the Senate's most prominent progressive voices on economic policy and technology regulation. Former Harvard Law professor and architect of the Consumer Financial Protection Bureau.",
    sources:
      "Senate voting record (GovTrack), DW-NOMINATE, 2020 presidential campaign platform.",
    scores: {
      immigration:    0.72,
      government:     0.85,   // CFPB architect; major regulatory champion
      economy:        0.90,   // wealth tax proposals, anti-corporate, student debt relief
      healthcare:     0.88,   // Medicare for All supporter
      education:      0.85,   // student debt cancellation, free college advocate
      environment:    0.82,
      civilLiberties: 0.75,
      foreignPolicy:  0.58,   // more non-interventionist than party average
      technology:     0.90,   // one of Congress's most aggressive big-tech critics
      social:         0.88,
    },
  },
];

/**
 * Get the top 2 politicians for a given US state code.
 * Priority: governor → senator (by seniority) → representative.
 */
export function getLocalPoliticians(stateCode: string): PoliticianProfile[] {
  const ROLE_ORDER = { governor: 0, senator: 1, representative: 2 };

  return STATE_POLITICIANS
    .filter((p) => p.state === stateCode.toUpperCase())
    .sort((a, b) => {
      const roleA = ROLE_ORDER[a.role ?? "representative"];
      const roleB = ROLE_ORDER[b.role ?? "representative"];
      if (roleA !== roleB) return roleA - roleB;
      return (a.seniority ?? 99) - (b.seniority ?? 99);
    })
    .slice(0, 2);
}
