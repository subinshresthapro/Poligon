/**
 * ScoreLegend
 * -----------
 * Explains the signed axis score to the user.
 *
 * +1 = strongly progressive / reform on that axis  (outer ring, progressive pole)
 * −1 = strongly conservative / traditional on that axis  (inner, conservative pole)
 *  0 = neutral or genuinely mixed
 *
 * Both a committed progressive and a committed conservative should produce a
 * large polygon — they just differ in *shape* (which spokes point outward or
 * inward), not overall size.
 */
export default function ScoreLegend() {
  // Conviction bands — the polygon plots |score|, so 1.0 = maximum
  // conviction regardless of whether you lean progressive or conservative.
  const items = [
    { score: "1.0", label: "Maximum conviction", dot: "bg-[#5560C8]" },
    { score: "0.75", label: "Strong conviction", dot: "bg-indigo-400" },
    { score: "0.5", label: "Moderate conviction", dot: "bg-slate-400" },
    { score: "0.25", label: "Mild / uncertain", dot: "bg-slate-300" },
    { score: "0.0", label: "Neutral", dot: "bg-slate-200 border border-slate-300" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {items.map(({ score, label, dot }) => (
        <div key={score} className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full flex-shrink-0 ${dot}`} />
          <span className="text-sm font-semibold text-[#0A0A0A] w-8">{score}</span>
          <span className="text-sm text-[rgba(10,10,10,0.55)]">{label}</span>
        </div>
      ))}
      <p className="text-xs text-[rgba(10,10,10,0.40)] mt-3 leading-relaxed">
        <strong>Spoke length = conviction strength.</strong> A committed conservative
        and a committed progressive both produce a full polygon — they just lean in
        different directions. Hover any spoke or open Category Breakdown to see
        which direction your position is on each axis.
      </p>
    </div>
  );
}
