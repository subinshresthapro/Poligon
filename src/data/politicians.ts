export interface PoliticianProfile {
  id: string;
  name: string;
  title: string;
  party: string;
  country: string;
  description: string;
  /** Scores estimated from published voting records, policy platforms,
   *  and publicly stated positions. Values from -1 (strong opposition)
   *  to +1 (strong support) relative to each category's direction. */
  scores: Record<string, number>;
  sources: string;
}

/**
 * IMPORTANT DISCLAIMER:
 * These scores are approximations for educational purposes only,
 * derived from publicly available voting records (VoteSmart, GovTrack),
 * policy platforms, and published political science research (e.g.,
 * DW-NOMINATE, Pew Research). They do not represent an endorsement
 * of any politician or political position. Individual positions are
 * multidimensional and cannot be perfectly captured numerically.
 */
export const POLITICIANS: PoliticianProfile[] = [
  {
    id: "bernie-sanders",
    name: "Bernie Sanders",
    title: "U.S. Senator (I-VT)",
    party: "Independent / Democratic Socialist",
    country: "United States",
    description:
      "Long-time advocate for economic equality, universal healthcare, and anti-war policy. Known for consistency across decades on progressive economic issues.",
    sources:
      "Based on Senate voting record (GovTrack), 2016/2020 campaign platforms, and political science scoring (DW-NOMINATE).",
    scores: {
      immigration: 0.50,    // supports pathways; historically skeptical of guest worker programs
      government: 0.85,     // strongly pro-active government
      economy: 0.92,        // wealth taxes, $15 min wage, worker ownership
      healthcare: 0.95,     // Medicare for All author
      education: 0.88,      // free public college
      environment: 0.80,    // Green New Deal supporter
      civilLiberties: 0.65, // voted against Patriot Act, pro-civil liberties
      foreignPolicy: 0.68,  // voted against Iraq war, generally anti-interventionist
      technology: 0.55,     // supports breaking up big tech
      social: 0.78,         // progressive on social issues
    },
  },
  {
    id: "aoc",
    name: "Alexandria Ocasio-Cortez",
    title: "U.S. Representative (D-NY-14)",
    party: "Democrat / Democratic Socialist",
    country: "United States",
    description:
      "One of the most prominent progressive voices in Congress. Co-authored the Green New Deal; advocates for sweeping economic and social reform.",
    sources:
      "Based on House voting record (GovTrack), published policy positions, and campaign platforms.",
    scores: {
      immigration: 0.90,    // strongly pro-immigration, abolish ICE positions
      government: 0.90,     // strongly supports active government
      economy: 0.90,        // wealth taxes, pro-labor, anti-corporate
      healthcare: 0.95,     // Medicare for All co-sponsor
      education: 0.90,      // free college advocate
      environment: 0.97,    // Green New Deal author, aggressive climate action
      civilLiberties: 0.80, // anti-surveillance, police reform advocate
      foreignPolicy: 0.68,  // anti-war, non-interventionist
      technology: 0.72,     // pro-regulation of big tech
      social: 0.95,         // strongly progressive on social issues
    },
  },
  {
    id: "barack-obama",
    name: "Barack Obama",
    title: "44th U.S. President (2009–2017)",
    party: "Democrat",
    country: "United States",
    description:
      "Center-left pragmatist. Passed the Affordable Care Act and the Paris Climate Agreement, while also expanding national security programs and military operations.",
    sources:
      "Based on Presidential record, legislation signed, executive orders, and Pew Research Center analysis.",
    scores: {
      immigration: 0.45,    // DACA, but record deportations; complex record
      government: 0.52,     // ACA, stimulus; generally center-left
      economy: 0.38,        // moderate on taxes; supported Wall St. bailout
      healthcare: 0.60,     // ACA (not single-payer)
      education: 0.38,      // Race to the Top; some school choice support
      environment: 0.58,    // Paris Agreement; but also expanded oil production
      civilLiberties: 0.12, // expanded NSA surveillance, drone program
      foreignPolicy: -0.18, // Libya, Afghanistan surge, drone strikes
      technology: 0.35,     // net neutrality support
      social: 0.72,         // marriage equality, civil rights expansion
    },
  },
  {
    id: "mitt-romney",
    name: "Mitt Romney",
    title: "U.S. Senator (R-UT)",
    party: "Republican",
    country: "United States",
    description:
      "Moderate conservative known for bipartisanship, fiscal discipline, and independent streak within the Republican party. Voted to convict in both Trump impeachment trials.",
    sources:
      "Based on Senate and presidential record, 2012 campaign platform, and GovTrack voting analysis.",
    scores: {
      immigration: -0.32,   // supported stricter enforcement
      government: -0.55,    // pro-smaller government, federalism
      economy: -0.45,       // tax cuts, pro-business, free trade
      healthcare: -0.22,    // RomneyCare in MA; opposed ACA nationally
      education: -0.28,     // supports school choice
      environment: -0.22,   // acknowledged climate change; opposed aggressive regulation
      civilLiberties: 0.15, // more moderate than most Republicans
      foreignPolicy: -0.45, // hawkish foreign policy; pro-military
      technology: -0.10,    // moderate on tech regulation
      social: -0.48,        // conservative on social issues; more moderate than GOP mainstream
    },
  },
  {
    id: "ron-paul",
    name: "Ron Paul",
    title: "Former U.S. Representative (R-TX)",
    party: "Republican / Libertarian",
    country: "United States",
    description:
      "Consistent libertarian voice for decades. Champion of civil liberties, non-interventionism, and minimal government — across both economic and personal domains.",
    sources:
      "Based on 22-year House voting record (GovTrack), 2008/2012 presidential platforms, and published libertarian positions.",
    scores: {
      immigration: 0.20,    // free movement, but also state sovereignty — genuinely mixed
      government: -0.92,    // strongly anti-government intervention
      economy: -0.88,       // gold standard, anti-Fed, anti-tax
      healthcare: -0.90,    // opposed Medicare/Medicaid expansion
      education: -0.72,     // supports abolishing Dept. of Education
      environment: -0.55,   // anti-regulation; skeptical of government climate action
      civilLiberties: 0.90, // strongly pro-civil liberties; anti-surveillance
      foreignPolicy: 0.82,  // one of Congress's most consistent anti-war votes
      technology: -0.60,    // anti-regulation across the board
      social: 0.08,         // libertarian: leave personal choices to individuals/states
    },
  },
  {
    id: "donald-trump",
    name: "Donald Trump",
    title: "45th & 47th U.S. President",
    party: "Republican",
    country: "United States",
    description:
      "Nationalist-populist approach combining aggressive immigration restriction, tax cuts and deregulation, skepticism of multilateral institutions, and conservative social policy.",
    sources:
      "Based on executive actions, legislation signed (2017–2021 and 2025–), campaign platforms, and Pew Research Center policy tracking.",
    scores: {
      immigration: -0.92,   // travel bans, wall, mass deportation rhetoric
      government: -0.28,    // anti-regulation but pro-tariff/protectionist; mixed
      economy: -0.52,       // major tax cuts, pro-business; some protectionism
      healthcare: -0.72,    // tried to repeal ACA, anti-universal coverage
      education: -0.45,     // school choice, reduced federal role
      environment: -0.88,   // withdrew from Paris Agreement, pro-fossil fuels
      civilLiberties: -0.35, // "law and order," surveillance expansion
      foreignPolicy: -0.20, // pro-military spending but withdrew from some engagements; complex
      technology: -0.22,    // general deregulation; criticized big tech but no action
      social: -0.82,        // conservative on social issues
    },
  },
];

export const POLITICIAN_MAP: Record<string, PoliticianProfile> = Object.fromEntries(
  POLITICIANS.map((p) => [p.id, p])
);
