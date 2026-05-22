"use client";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { CATEGORIES } from "@/data/questions";
import { DIMENSION_COLORS } from "@/components/PoligonShape";
import { getSegmentColor } from "@/lib/colorUtils";
import { IdeologyProfile } from "@/types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PoliticalRadarChartProps {
  scores: Record<string, number>;
  name?: string;
  overlays?: IdeologyProfile[];
  height?: number;
  /** Compact — hides pole sub-labels; used in embed / small contexts */
  compact?: boolean;
}

interface TooltipState {
  x: number;
  y: number;
  catIndex: number;
}

// ── Canvas draw function ──────────────────────────────────────────────────────

/**
 * Draw the full Poligon radar onto a canvas context.
 *
 * This function is intentionally pure (no React hooks) so it can also be
 * called for off-screen PNG export via exportPoligonPNG().
 *
 * @param ctx      2D context, already scaled for DPR if needed
 * @param size     Logical canvas size in CSS px
 * @param scores   Signed axis scores (−1 … +1)
 * @param overlays Ideology / profile overlays drawn as polygon outlines
 * @param compact  When true, skip pole sub-labels to save space
 * @param bgColor  If set, fill a background before drawing (for PNG export)
 */
export function drawPoligonOnCtx(
  ctx: CanvasRenderingContext2D,
  size: number,
  scores: Record<string, number>,
  overlays: IdeologyProfile[],
  compact: boolean,
  bgColor?: string
) {
  const cx = size / 2;
  const cy = size / 2;
  // Reserve margin for axis labels; compact needs less
  const margin = compact ? 22 : 78;
  const maxR = size / 2 - margin;
  const n = CATEGORIES.length;

  ctx.clearRect(0, 0, size, size);

  // Optional background (PNG export)
  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
  }

  // ── Grid rings ──────────────────────────────────────────────────────────
  const rings = [0.25, 0.5, 0.75, 1.0];
  rings.forEach((frac) => {
    ctx.beginPath();
    ctx.arc(cx, cy, frac * maxR, 0, Math.PI * 2);
    ctx.strokeStyle =
      frac === 1.0 ? "rgba(10,10,10,0.14)" : "rgba(10,10,10,0.07)";
    ctx.lineWidth = frac === 1.0 ? 1.2 : 0.8;
    if (frac < 1.0) ctx.setLineDash([2, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // ── Spoke lines ─────────────────────────────────────────────────────────
  CATEGORIES.forEach((_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
    ctx.strokeStyle = "rgba(10,10,10,0.07)";
    ctx.lineWidth = 0.7;
    ctx.stroke();
  });

  // ── Compute vertices ────────────────────────────────────────────────────
  const verts = CATEGORIES.map((cat, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const signed = Math.max(-1, Math.min(1, scores[cat.id] ?? 0));
    const r = Math.abs(signed) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
      signed,
      fillColor: getSegmentColor(cat.id, signed),
      cat,
    };
  });

  // ── Wedge fills (shade-encoded) ─────────────────────────────────────────
  verts.forEach((v, i) => {
    const next = verts[(i + 1) % n];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(v.x, v.y);
    ctx.lineTo(next.x, next.y);
    ctx.closePath();
    ctx.fillStyle = v.fillColor;
    ctx.globalAlpha = 0.86;
    ctx.fill();
    ctx.globalAlpha = 1;
    // Wedge border
    ctx.strokeStyle = "rgba(10,10,10,0.07)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  });

  // ── Vertex dots ─────────────────────────────────────────────────────────
  const dotR = size > 200 ? 4.5 : 2.5;
  verts.forEach((v) => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, dotR, 0, Math.PI * 2);
    ctx.fillStyle = v.fillColor;
    ctx.globalAlpha = 0.95;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(10,10,10,0.22)";
    ctx.lineWidth = 1.4;
    ctx.stroke();
  });

  // ── Overlay polygons (ideologies / comparison profiles) ─────────────────
  overlays.forEach((ov) => {
    const ovVerts = CATEGORIES.map((cat, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      const r = Math.abs(ov.scores[cat.id] ?? 0) * maxR;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

    ctx.beginPath();
    ovVerts.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fillStyle = ov.fillColor;
    ctx.globalAlpha = 0.13;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = ov.color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // ── Axis labels (skip in compact mode) ──────────────────────────────────
  if (compact) return;

  const mainFont = 600;
  const mainSize = 11;
  const subSize = 7.5;
  const labelR = maxR + 20;

  CATEGORIES.forEach((cat, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const lx = cx + labelR * cosA;
    const ly = cy + labelR * sinA;

    const textAlign: CanvasTextAlign =
      Math.abs(cosA) < 0.15 ? "center" : cosA > 0 ? "left" : "right";
    const textBaseline: CanvasTextBaseline =
      Math.abs(sinA) < 0.15 ? "middle" : sinA > 0 ? "top" : "bottom";

    // Main label
    ctx.font = `${mainFont} ${mainSize}px 'Outfit', system-ui, sans-serif`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = "#0A0A0A";
    ctx.fillText(`${cat.emoji} ${cat.shortName}`, lx, ly);

    // Position the sub-labels just below the main label
    let subY: number;
    if (textBaseline === "bottom") {
      subY = ly + 2;         // main text extends upward from ly
    } else if (textBaseline === "top") {
      subY = ly + mainSize + 3;
    } else {
      subY = ly + mainSize / 2 + 3;
    }

    // Positive pole (progressive → light shade)
    ctx.font = `${subSize}px system-ui, sans-serif`;
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(16,140,80,0.78)";
    ctx.fillText(`↑ ${cat.positiveLabel}`, lx, subY);

    // Negative pole (conservative → dark shade)
    ctx.fillStyle = "rgba(200,60,30,0.68)";
    ctx.fillText(`↓ ${cat.negativeLabel}`, lx, subY + subSize + 2);
  });
}

// ── PNG export helper ────────────────────────────────────────────────────────

/**
 * Render the Poligon at `size` px (2× for crisp exports), draw a cream
 * background, and return a data-URI PNG string for download.
 */
export function exportPoligonPNG(
  scores: Record<string, number>,
  options: { size?: number; bgColor?: string } = {}
): string {
  const size = options.size ?? 600;
  const bg = options.bgColor ?? "#F1EEE5";
  const dpr = 2;

  const canvas = document.createElement("canvas");
  canvas.width = size * dpr;
  canvas.height = size * dpr;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  drawPoligonOnCtx(ctx, size, scores, [], false, bg);
  return canvas.toDataURL("image/png");
}

// ── React component ──────────────────────────────────────────────────────────

export default function PoliticalRadarChart({
  scores,
  name = "Your Shape",
  overlays = [],
  height = 480,
  compact = false,
}: PoliticalRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // ── Draw whenever data changes ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr =
      typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
    const size = height;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    drawPoligonOnCtx(ctx, size, scores, overlays, compact);
  }, [scores, overlays, height, compact]);

  // ── Tooltip hit-testing ────────────────────────────────────────────────
  const hitTest = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;

      const size = height;
      const cx = size / 2;
      const cy = size / 2;
      const margin = compact ? 22 : 78;
      const maxR = size / 2 - margin;
      const n = CATEGORIES.length;

      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > maxR * 1.1) {
        setTooltip(null);
        return;
      }

      // Angle from top, normalised to [0, 2π]
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += Math.PI * 2;

      const sectorAngle = (Math.PI * 2) / n;
      const idx = Math.floor(angle / sectorAngle) % n;
      setTooltip({ x: mx, y: my, catIndex: idx });
    },
    [height, compact]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => hitTest(e.clientX, e.clientY),
    [hitTest]
  );
  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      if (e.touches[0]) hitTest(e.touches[0].clientX, e.touches[0].clientY);
    },
    [hitTest]
  );

  // ── Tooltip content ───────────────────────────────────────────────────
  const renderTooltip = () => {
    if (!tooltip) return null;
    const cat = CATEGORIES[tooltip.catIndex];
    if (!cat) return null;

    const signed = scores[cat.id] ?? 0;
    const absV = Math.abs(signed);

    let label: string;
    let pole: string | undefined;
    if (absV < 0.12) {
      label = "Mixed / Neutral";
    } else if (signed >= 0.7) {
      label = "Strongly progressive";
      pole = cat.positiveLabel;
    } else if (signed >= 0.3) {
      label = "Progressive lean";
      pole = cat.positiveLabel;
    } else if (signed > -0.3) {
      label = "Mixed / Neutral";
    } else if (signed > -0.7) {
      label = "Conservative lean";
      pole = cat.negativeLabel;
    } else {
      label = "Strongly conservative";
      pole = cat.negativeLabel;
    }

    const shadeColor = getSegmentColor(cat.id, signed);

    return (
      <div
        className="absolute pointer-events-none z-50 max-w-[210px] rounded-xl border shadow-lg p-3 text-xs"
        style={{
          left: tooltip.x + 14,
          top: tooltip.y - 14,
          background: "#F1EEE5",
          borderColor: "rgba(10,10,10,0.12)",
        }}
      >
        {/* Axis header */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: shadeColor }}
          />
          <span className="font-semibold text-[#0A0A0A]">
            {cat.emoji} {cat.name}
          </span>
        </div>

        {/* Pole labels */}
        <p className="text-[10px] leading-snug mb-1.5">
          <span style={{ color: "rgba(16,140,80,0.9)" }}>↑ {cat.positiveLabel}</span>
          <span className="text-[rgba(10,10,10,0.35)]"> · </span>
          <span style={{ color: "rgba(200,60,30,0.85)" }}>↓ {cat.negativeLabel}</span>
        </p>

        {/* Score + direction */}
        <div className="flex items-center gap-1.5">
          <span
            className="font-mono font-semibold"
            style={{ color: shadeColor }}
          >
            {signed >= 0 ? "+" : ""}
            {signed.toFixed(2)}
          </span>
          <span className="text-[rgba(10,10,10,0.55)]">
            {label}
            {pole && (
              <em className="text-[10px]"> → {pole}</em>
            )}
          </span>
        </div>

        {/* Overlay scores if any */}
        {overlays.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-[rgba(10,10,10,0.08)] space-y-0.5">
            {overlays.map((ov) => {
              const ovS = ov.scores[cat.id] ?? 0;
              return (
                <div key={ov.id} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: ov.color }}
                  />
                  <span className="text-[rgba(10,10,10,0.65)]">{ov.name}:</span>
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: ov.color }}
                  >
                    {ovS >= 0 ? "+" : ""}
                    {ovS.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ── Legend (overlays only) ───────────────────────────────────────────
  const renderLegend = () => {
    if (overlays.length === 0) return null;
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs text-[rgba(10,10,10,0.55)]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#5560C8]" />
          <span>{name}</span>
        </div>
        {overlays.map((ov) => (
          <div key={ov.id} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border-[1.5px]"
              style={{ borderColor: ov.color, background: ov.color + "22" }}
            />
            <span style={{ color: ov.color }}>{ov.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          style={{ display: "block", cursor: "crosshair" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setTooltip(null)}
        />
        {renderTooltip()}
      </div>
      {renderLegend()}
    </div>
  );
}
