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
  const items = [
    { score: "+1.0", label: "Strongly progressive", dot: "bg-emerald-600" },
    { score: "+0.5", label: "Leans progressive", dot: "bg-emerald-400" },
    { score: "0.0", label: "Neutral / Mixed", dot: "bg-slate-400" },
    { score: "−0.5", label: "Leans conservative", dot: "bg-orange-400" },
    { score: "−1.0", label: "Strongly conservative", dot: "bg-red-600" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {items.map(({ score, label, dot }) => (
        <div key={score} className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full flex-shrink-0 ${dot}`} />
          <span className="text-sm font-semibold text-[#0A0A0A] w-10">{score}</span>
          <span className="text-sm text-[rgba(10,10,10,0.55)]">{label}</span>
        </div>
      ))}
      <p className="text-xs text-[rgba(10,10,10,0.40)] mt-2 leading-relaxed">
        Each axis has two named poles — hover a spoke to see what <em>your</em> direction means.
        Both committed progressives and conservatives can produce a full polygon; the shape,
        not the size, shows where you stand.
      </p>
    </div>
  );
}
