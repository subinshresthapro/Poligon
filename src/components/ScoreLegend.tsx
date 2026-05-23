/**
 * ScoreLegend
 * -----------
 * Explains the dual visual encoding of the Poligon shape:
 *
 *  SPOKE LENGTH  = conviction strength (|score|).
 *    Both a committed progressive and a committed conservative produce a
 *    full, large polygon — they differ in shape, not size.
 *
 *  WEDGE SHADE   = direction.
 *    Light, vibrant pastel  →  progressive / reform on that axis.
 *    Deep, rich dark        →  conservative / traditional on that axis.
 *
 * This means two extreme profiles look completely different even when both
 * polygons are full-size: one is a pastel rainbow, the other a deep jewel-
 * tone palette.
 */
export default function ScoreLegend() {
  return (
    <div className="flex flex-col gap-3">
      {/* Length encoding */}
      <div>
        <p className="text-xs font-semibold text-[#0A0A0A] mb-1.5">
          Spoke length = conviction strength
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { pct: "100 %", label: "Strong conviction", width: "w-full" },
            { pct: "50 %",  label: "Moderate",          width: "w-1/2" },
            { pct: "0 %",   label: "Neutral / none",    width: "w-0" },
          ].map(({ pct, label, width }) => (
            <div key={pct} className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-[rgba(10,10,10,0.06)] rounded-full overflow-hidden flex-shrink-0">
                <div className={`h-full bg-[var(--color-accent)] rounded-full ${width}`} />
              </div>
              <span className="text-xs text-[rgba(10,10,10,0.55)]">
                <span className="font-semibold text-[#0A0A0A] w-8 inline-block">{pct}</span>
                {" "}{label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shade encoding */}
      <div>
        <p className="text-xs font-semibold text-[#0A0A0A] mb-1.5">
          Wedge shade = direction
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 rounded flex-shrink-0" style={{
              background: "linear-gradient(90deg, #C7E4A0 0%, #8FA82E 50%, #2E4A06 100%)"
            }} />
            <span className="text-xs text-[rgba(10,10,10,0.55)]">
              <span className="text-emerald-600 font-semibold">Light</span>
              {" = progressive · "}
              <span className="text-[rgba(10,10,10,0.7)] font-semibold">Dark</span>
              {" = conservative"}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-[rgba(10,10,10,0.40)] leading-relaxed">
        Hover any spoke for the axis name, your score, and which direction it
        leans. Open Category Breakdown for the full per-axis detail.
      </p>
    </div>
  );
}
