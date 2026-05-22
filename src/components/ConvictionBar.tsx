import { convictionPercent } from "@/lib/scoring";

interface Props {
  score: number;
  categoryColor?: string; // hex color for the bar fill
}

export default function ConvictionBar({ score, categoryColor = "#888780" }: Props) {
  const pct = convictionPercent(score);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
        <span style={{ color: "rgba(10,10,10,0.45)" }}>Conviction</span>
        <span style={{ fontWeight: 500, color: "rgba(10,10,10,0.70)" }}>{pct}%</span>
      </div>
      <div style={{ height: "5px", background: "rgba(10,10,10,0.06)", borderRadius: "3px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: categoryColor,
            borderRadius: "3px",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}
