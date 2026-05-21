export default function ScoreLegend() {
  const items = [
    { score: "+1.0", label: "Strongly Supports", dot: "bg-emerald-600" },
    { score: "+0.5", label: "Support", dot: "bg-emerald-400" },
    { score: "0.0", label: "Neutral / Mixed", dot: "bg-slate-400" },
    { score: "−0.5", label: "Oppose", dot: "bg-orange-400" },
    { score: "−1.0", label: "Strongly Oppose", dot: "bg-red-600" },
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
    </div>
  );
}
