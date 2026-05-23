import Link from "next/link";
import IdeologyGallery from "@/components/IdeologyGallery";
import ScoreLegend from "@/components/ScoreLegend";
import PoligonShape from "@/components/PoligonShape";
import CompareShape from "@/components/CompareShape";

// Sample scores for the homepage preview (broadly Reform Progressive)
const PREVIEW_SCORES: Record<string, number> = {
  immigration: 0.25, government: 0.75, economy: 0.88, healthcare: 0.75,
  education: 0.25, environment: 0.63, civilLiberties: 0.70, foreignPolicy: 0.45,
  technology: 0.65, social: 0.55,
};

// Comparison preview: Reform Progressive vs National Conservative
const COMPARE_A: Record<string, number> = {
  immigration: 0.55, government: 0.65, economy: 0.55, healthcare: 0.70,
  education: 0.65, environment: 0.70, civilLiberties: 0.60, foreignPolicy: 0.35,
  technology: 0.50, social: 0.65,
};
const COMPARE_B: Record<string, number> = {
  immigration: -0.80, government: -0.60, economy: -0.50, healthcare: -0.50,
  education: -0.35, environment: -0.45, civilLiberties: -0.10, foreignPolicy: -0.55,
  technology: -0.20, social: -0.75,
};

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
            Most tools put you on a line: left or right. We map your views across{" "}
            <strong className="text-white">10 different dimensions</strong>, creating a
            coloured polygon that&apos;s uniquely yours: your political identity at a glance.
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
                desc: "Rate how much you agree or disagree with statements across 10 topics: things like the economy, healthcare, environment, and personal freedoms.",
              },
              {
                icon: "⬡",
                title: "See your unique shape",
                desc: "Each topic becomes one spoke on a coloured polygon. Your answers determine how far each point extends, creating a shape that's yours alone.",
              },
              {
                icon: "🔗",
                title: "Compare with a friend",
                desc: "Share your compare link. When a friend takes the quiz and opens it, both polygons appear overlaid. Political difference as geometry, not warfare.",
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
                Each spoke represents one topic. The further a point extends from the center,
                the stronger your conviction on that dimension. A spoke at the outer edge means
                deep conviction; near the center means near-neutral. The connected points form your unique coloured polygon.
              </p>
              <ScoreLegend />
              <div className="mt-6 p-4 bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-xl text-sm text-[rgba(10,10,10,0.55)]">
                <strong className="text-[#0A0A0A]">Important:</strong> Scores reflect your
                position on a specific dimension, not a left-right axis. Two people with
                very different politics can both score high on civil liberties, for
                completely different reasons.
              </div>
            </div>
            <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl p-6 shadow-sm text-center">
              <div className="text-[rgba(10,10,10,0.55)] text-xs font-semibold uppercase tracking-widest mb-4">
                Your shape will look something like this
              </div>
              <div className="flex items-center justify-center">
                <PoligonShape scores={PREVIEW_SCORES} size={200} />
              </div>
              <p className="text-xs text-[rgba(10,10,10,0.55)] mt-2 mb-4">
                Each person&apos;s shape is unique. Take the quiz to see yours.
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

      {/* ── Compare feature callout ─────────────────────────────────── */}
      <section className="py-16 bg-[#0A0A0A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Text */}
            <div>
              <p className="text-[#5560C8] text-xs font-semibold uppercase tracking-widest mb-3">
                The social feature
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.025em" }}
              >
                Compare shapes<br />with someone you know
              </h2>
              <p className="text-[rgba(241,238,229,0.60)] text-base leading-relaxed mb-4">
                Political disagreement becomes personal when it&apos;s between people who know each other. Poligon turns that into geometry.
              </p>
              <p className="text-[rgba(241,238,229,0.50)] text-sm leading-relaxed mb-6">
                Share your compare link. When your partner, colleague, or friend opens it and takes the quiz, both shapes appear overlaid on the same polygon. Where they overlap, you agree. Where they diverge, you don&apos;t. No labels required.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-[rgba(241,238,229,0.55)]">
                {["Couples", "Coworkers", "Families", "Friends", "Book clubs"].map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="bg-[#F1EEE5] rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <CompareShape scoresA={COMPARE_A} scoresB={COMPARE_B} nameA="You" nameB="Your friend" size={220} />
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 text-xs mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#5560C8]" />
                  <span className="text-[rgba(10,10,10,0.70)] font-medium">You</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#E8782E]" />
                  <span className="text-[rgba(10,10,10,0.70)] font-medium">Your friend</span>
                </span>
              </div>

              <p className="text-xs text-[rgba(10,10,10,0.45)] italic">
                &ldquo;Political difference as geometry, not warfare.&rdquo;
              </p>

              <Link
                href="/quiz"
                className="inline-block mt-4 bg-[#5560C8] hover:bg-[#4450B2] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Take the Quiz to Compare →
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
            No account required. Data is passed as a simple JSON object.
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
