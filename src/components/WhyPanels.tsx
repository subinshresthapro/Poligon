"use client";

import { useEffect, useRef, ReactNode } from "react";

/* ── Per-panel accent colours (cycling through the dimension palette) ──── */
const ACCENTS = [
  "#E8782E", // orange
  "#4257C9", // blue
  "#D4A53C", // amber
  "#3AA361", // teal
  "#B8385E", // pink
  "#8B4FCB", // purple
];

interface Panel {
  title: string;
  body: ReactNode;
}

function AnimatedPanel({
  children,
  fromRight,
  accent,
}: {
  children: ReactNode;
  fromRight: boolean;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden & shifted
    el.style.opacity = "0";
    el.style.transform = fromRight ? "translateX(32px)" : "translateX(-32px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fromRight]);

  return (
    <div
      ref={ref}
      style={{ transition: "opacity 0.65s ease, transform 0.65s ease" }}
      className="bg-white rounded-2xl border border-[rgba(10,10,10,0.09)] shadow-sm overflow-hidden"
    >
      {/* Coloured top accent bar */}
      <div style={{ height: "3px", background: accent }} />
      <div className="p-7 sm:p-8">{children}</div>
    </div>
  );
}

export default function WhyPanels({ panels }: { panels: Panel[] }) {
  return (
    <div className="max-w-[900px] mx-auto">
      {panels.map((panel, i) => {
        const isRight = i % 2 === 1;
        return (
          <div
            key={i}
            className="w-full sm:w-[62%]"
            style={{
              marginLeft: isRight ? "auto" : undefined,
              marginTop: i === 0 ? 0 : "2rem",
            }}
          >
            <AnimatedPanel fromRight={isRight} accent={ACCENTS[i % ACCENTS.length]}>
              <h2
                className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {panel.title}
              </h2>
              {panel.body}
            </AnimatedPanel>
          </div>
        );
      })}
    </div>
  );
}
