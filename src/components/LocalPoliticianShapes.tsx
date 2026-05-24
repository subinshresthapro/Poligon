"use client";

import { useGeoState } from "@/hooks/useGeoState";
import { getLocalPoliticians } from "@/data/statePoliticians";
import { shapeScore, convictionPercent } from "@/lib/scoring";
import LeanBadge from "@/components/LeanBadge";
import PoligonShape from "@/components/PoligonShape";

const PARTY_COLOR: Record<string, string> = {
  Democrat:                          "#2563eb",
  "Democrat / Democratic Socialist": "#7c3aed",
  Republican:                        "#dc2626",
  "Republican / Libertarian":        "#d97706",
};

function partyColor(party: string): string {
  return PARTY_COLOR[party] ?? "#6366f1";
}

const ROLE_LABEL: Record<string, string> = {
  governor:       "Governor",
  senator:        "U.S. Senator",
  representative: "U.S. Representative",
};

interface Props {
  /** When true, renders the locked teaser (names only, no shapes). */
  locked?: boolean;
}

/**
 * Shows up to 2 local politicians for the user's detected US state.
 * Renders nothing if we can't detect a state or have no data for it.
 */
export default function LocalPoliticianShapes({ locked = false }: Props) {
  const { stateCode, loading } = useGeoState();

  // Don't render anything until we know the state (avoids layout shift)
  if (loading || !stateCode) return null;

  const politicians = getLocalPoliticians(stateCode);
  if (politicians.length === 0) return null;

  const stateName = STATE_NAMES[stateCode] ?? stateCode;

  // ── Locked teaser ────────────────────────────────────────────────────────
  if (locked) {
    return (
      <div className="mb-6">
        <p className="text-xs font-semibold text-[rgba(10,10,10,0.40)] uppercase tracking-widest mb-2 text-center">
          Your Representatives · {stateName}
        </p>
        <div className="flex gap-2 justify-center flex-wrap text-sm text-[rgba(10,10,10,0.45)]">
          {politicians.map((p) => (
            <span
              key={p.id}
              className="flex items-center gap-1.5 bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] px-3 py-1 rounded-full"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: partyColor(p.party) }}
              />
              {p.name}
              <span className="text-[rgba(10,10,10,0.35)] text-xs">
                · {ROLE_LABEL[p.role ?? "representative"]}
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ── Unlocked cards ───────────────────────────────────────────────────────
  return (
    <div className="mb-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-lg">📍</span>
        <h3
          className="text-lg font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Your Representatives — {stateName}
        </h3>
      </div>

      {/* Estimation note */}
      <p className="text-center text-xs text-[rgba(10,10,10,0.45)] mb-5 max-w-lg mx-auto leading-relaxed">
        Shapes estimated from voting records, sponsored legislation, and stated positions.{" "}
        <span className="italic">Approximations for educational comparison only.</span>
      </p>

      <div className="flex gap-4 justify-center flex-wrap">
        {politicians.map((politician) => {
          const avg = shapeScore(politician.scores);
          const color = partyColor(politician.party);
          return (
            <div
              key={politician.id}
              className="bg-[#F1EEE5] border-2 border-[rgba(10,10,10,0.15)] rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden w-40"
              style={{ borderTopColor: color }}
            >
              {/* Color accent bar */}
              <div className="h-1.5 w-full" style={{ background: color }} />

              <div className="p-3 flex flex-col flex-1">
                <h4
                  className="text-sm font-bold text-center mb-0.5 leading-snug"
                  style={{ color }}
                >
                  {politician.name}
                </h4>
                <p className="text-xs text-[rgba(10,10,10,0.45)] text-center mb-1 leading-snug">
                  {ROLE_LABEL[politician.role ?? "representative"]}
                </p>

                {/* Shape */}
                <div className="w-full flex items-center justify-center py-1">
                  <PoligonShape scores={politician.scores} size={110} />
                </div>

                {/* Score badge */}
                <div className="mt-2 text-center flex items-center justify-center gap-1.5">
                  <span className="text-xs text-[rgba(10,10,10,0.45)]">
                    {convictionPercent(avg)}%
                  </span>
                  <LeanBadge score={avg} size="sm" />
                </div>

                {/* Party */}
                <div className="mt-1.5 text-center">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: color + "18", color }}
                  >
                    {politician.party.split(" / ")[0]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-b border-[rgba(10,10,10,0.08)]" />
    </div>
  );
}

// US state code → full name map
const STATE_NAMES: Record<string, string> = {
  AL: "Alabama",       AK: "Alaska",        AZ: "Arizona",       AR: "Arkansas",
  CA: "California",    CO: "Colorado",      CT: "Connecticut",   DE: "Delaware",
  FL: "Florida",       GA: "Georgia",       HI: "Hawaii",        ID: "Idaho",
  IL: "Illinois",      IN: "Indiana",       IA: "Iowa",          KS: "Kansas",
  KY: "Kentucky",      LA: "Louisiana",     ME: "Maine",         MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan",      MN: "Minnesota",     MS: "Mississippi",
  MO: "Missouri",      MT: "Montana",       NE: "Nebraska",      NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey",    NM: "New Mexico",    NY: "New York",
  NC: "North Carolina",ND: "North Dakota",  OH: "Ohio",          OK: "Oklahoma",
  OR: "Oregon",        PA: "Pennsylvania",  RI: "Rhode Island",  SC: "South Carolina",
  SD: "South Dakota",  TN: "Tennessee",     TX: "Texas",         UT: "Utah",
  VT: "Vermont",       VA: "Virginia",      WA: "Washington",    WV: "West Virginia",
  WI: "Wisconsin",     WY: "Wyoming",       DC: "Washington D.C.",
};
