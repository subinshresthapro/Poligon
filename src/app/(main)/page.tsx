import Link from "next/link";
import IdeologyGallery from "@/components/IdeologyGallery";
import ScoreLegend from "@/components/ScoreLegend";

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle dot-grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #5560C8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative polygon — top right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block overflow-hidden opacity-20">
          <svg
            viewBox="0 0 400 400"
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[440px] h-[440px]"
            aria-hidden="true"
          >
            <polygon points="200,30 335,115 335,285 200,370 65,285 65,115" fill="none" stroke="#5560C8" strokeWidth="1" />
            <polygon points="200,70 305,135 305,265 200,330 95,265 95,135" fill="none" stroke="#6E2226" strokeWidth="0.5" />
            <polygon points="200,110 275,155 275,245 200,290 125,245 125,155" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
            {/* Dimension-coloured slices */}
            {[
              ["200,200","200,30","335,115","#E8782E"],
              ["200,200","335,115","335,285","#8FA82E"],
              ["200,200","335,285","200,370","#D4A53C"],
              ["200,200","200,370","65,285","#B8385E"],
              ["200,200","65,285","65,115","#8B4FCB"],
              ["200,200","65,115","200,30","#3AA361"],
            ].map(([origin, p1, p2, color], i) => (
              <path
                key={i}
                d={`M ${origin} L ${p1} L ${p2} Z`}
                fill={color as string}
                fillOpacity={0.3}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Brand label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true">
              <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="#5560C8" />
              <polygon
                points="14,2 25,8 25,20 14,26 3,20 3,8"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinejoin="miter"
              />
            </svg>
            <span className="text-[#5560C8] font-semibold text-sm tracking-widest uppercase">
              Poligon · Polygon for Politics
            </span>
          </div>

          {/* THE MAIN MESSAGE */}
          <h1
            className="text-4xl sm:text-6xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.035em" }}
          >
            Your views aren&apos;t{" "}
            <em
              style={{
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#6E2226",
              }}
            >
              one-
            </em>
            <span className="bg-[#5560C8] text-white px-2">dimensional.</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-xl sm:text-2xl text-[rgba(241,238,229,0.75)] font-medium mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            The Shape of Your Politics
          </p>

          <p className="text-base text-[rgba(241,238,229,0.55)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Most tools put you on a line — left or right. We map your views across{" "}
            <strong className="text-white">10 different dimensions</strong>, creating a
            coloured polygon that&apos;s uniquely yours — your political identity at a glance.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm">
            {[
              { value: "10", label: "dimensions" },
              { value: "40", label: "questions" },
              { value: "~5 min", label: "to complete" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div
                  className="text-2xl font-bold text-[#5560C8]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {value}
                </div>
                <div className="text-[rgba(241,238,229,0.45)] text-xs uppercase tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors"
            >
              Discover My Shape →
            </Link>
            <Link
              href="/profiles"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors border border-white/20"
            >
              See Example Profiles
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F1EEE5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2
            className="text-2xl font-bold text-[#0A0A0A] text-center mb-10"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "Answer 40 questions",
                desc: "Rate how much you agree or disagree with statements across 10 topics — things like the economy, healthcare, environment, and personal freedoms.",
              },
              {
                icon: "⬡",
                title: "See your unique shape",
                desc: "Each topic becomes one spoke on a coloured polygon. Your answers determine how far each point extends — creating a shape that's yours alone.",
              },
              {
                icon: "🔗",
                title: "Share or embed",
                desc: "Copy a link to your results, embed the chart anywhere with an iframe, or compare your shape to different political archetypes.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-[#E5E0D2] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-[#0A0A0A] mb-2">{title}</h3>
                <p className="text-sm text-[rgba(10,10,10,0.55)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to read your shape ───────────────────────────────────── */}
      <section className="py-16 bg-[#E5E0D2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="text-2xl font-bold text-[#0A0A0A] mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                How to read your shape
              </h2>
              <p className="text-[rgba(10,10,10,0.55)] mb-6 leading-relaxed text-sm">
                Each spoke represents one topic. How far a point extends from the center
                shows how strongly you feel about it — from{" "}
                <span className="text-red-600 font-medium">−1 (strongly disagree)</span> at
                the center to{" "}
                <span className="text-emerald-600 font-medium">+1 (strongly agree)</span>{" "}
                at the outer edge. The connected points form your unique coloured polygon.
              </p>
              <ScoreLegend />
              <div className="mt-6 p-4 bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-xl text-sm text-[rgba(10,10,10,0.55)]">
                <strong className="text-[#0A0A0A]">Important:</strong> Scores reflect your
                position on a specific dimension, not a left–right axis. Two people with
                very different politics can both score high on civil liberties — for
                completely different reasons.
              </div>
            </div>
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl p-6 shadow-sm text-center">
              <div className="text-[rgba(10,10,10,0.55)] text-xs font-semibold uppercase tracking-widest mb-4">
                Your shape will look something like this
              </div>
              {/* Decorative polygon preview */}
              <div className="flex items-center justify-center" style={{ height: 200 }}>
                <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
                  {[0.25, 0.5, 0.75, 1].map((frac) => (
                    <circle
                      key={frac}
                      cx={90} cy={90} r={frac * 78}
                      fill="none"
                      stroke="rgba(10,10,10,0.10)"
                      strokeWidth={frac === 0.5 ? 1.25 : 0.75}
                      strokeDasharray={frac === 1 ? undefined : "2 4"}
                    />
                  ))}
                  {[
                    { angle: -90, score: 0.85, color: "#E8782E" },
                    { angle: -18, score: 0.60, color: "#8FA82E" },
                    { angle: 54,  score: 0.90, color: "#D4A53C" },
                    { angle: 126, score: 0.40, color: "#B8385E" },
                    { angle: 198, score: 0.70, color: "#8B4FCB" },
                    { angle: 270, score: 0.55, color: "#3AA361" },
                  ].map(({ angle: a, score: s, color: c }, i, arr) => {
                    const next = arr[(i + 1) % arr.length];
                    const r1 = s * 78;
                    const r2 = next.score * 78;
                    const toRad = (d: number) => (d * Math.PI) / 180;
                    const x1 = 90 + r1 * Math.cos(toRad(a));
                    const y1 = 90 + r1 * Math.sin(toRad(a));
                    const x2 = 90 + r2 * Math.cos(toRad(next.angle));
                    const y2 = 90 + r2 * Math.sin(toRad(next.angle));
                    return (
                      <path
                        key={i}
                        d={`M 90,90 L ${x1},${y1} L ${x2},${y2} Z`}
                        fill={c}
                        fillOpacity={0.75}
                        stroke="rgba(10,10,10,0.10)"
                        strokeWidth={0.75}
                      />
                    );
                  })}
                </svg>
              </div>
              <p className="text-xs text-[rgba(10,10,10,0.55)] mt-2 mb-4">
                Each person&apos;s shape is unique — take the quiz to see yours.
              </p>
              <Link
                href="/quiz"
                className="inline-block bg-[#5560C8] hover:bg-[#4450B2] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Reveal My Shape →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Archetype / Ideology gallery ─────────────────────────────── */}
      <IdeologyGallery />

      {/* ── Embed CTA ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0A0A0A] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Built for publishers &amp; journalists
          </h2>
          <p className="text-[rgba(241,238,229,0.55)] text-sm mb-6 leading-relaxed">
            Embed any political shape on your website with one line of code.
            Perfect for candidate profiles, voter guides, or news articles.
            No account required — data is passed as a simple JSON object.
            Each embed becomes a little colour-pop of political identity.
          </p>
          <pre className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-left text-xs text-[#5560C8] overflow-x-auto mb-6 font-mono leading-relaxed">
            {`<iframe
  src="https://your-domain.com/embed?data=..."
  width="600" height="520" frameborder="0"
></iframe>`}
          </pre>
          <Link
            href="/quiz"
            className="bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </>
  );
}
