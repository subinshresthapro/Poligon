import { leanLabel, leanLabelStyle } from "@/lib/scoring";

interface Props {
  score: number;
  size?: "sm" | "md";
  dark?: boolean; // use dark-bg variant (for dark card backgrounds)
}

export default function LeanBadge({ score, size = "md", dark = false }: Props) {
  const label = leanLabel(score);
  const style = leanLabelStyle(score);
  const fontSize = size === "sm" ? "10px" : "11px";
  const padding = size === "sm" ? "1px 5px" : "2px 7px";

  return (
    <span
      style={{
        display: "inline-block",
        fontSize,
        padding,
        borderRadius: "4px",
        fontWeight: 500,
        backgroundColor: dark ? style.darkBg : style.bg,
        color: dark ? style.darkText : style.text,
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}
