import Link from "next/link";
import IdeologyGallery from "@/components/IdeologyGallery";
import ScoreLegend from "@/components/ScoreLegend";
import PoligonShape from "@/components/PoligonShape";
import CompareShape from "@/components/CompareShape";
import ComparisonCarousel from "@/components/ComparisonCarousel";

// ── Hero polygon: asymmetric mixed-conviction profile ──────────────────────
// Strong reform on healthcare, environment, economy, tech
// Moderate on immigration, education, foreignPolicy
// Traditional lean on government, civilLiberties, social
// Creates a distinctive, visually interesting shape that isn't "all one color"
const HERO_SCORES: Record<string, number> = {
  immigration: 0.35,
  government: -0.65,
  economy: 0.80,
  healthcare: 0.95,
  education: 0.40,
  environment: 0.85,
  civilLiberties: -0.50,
  foreignPolicy: 0.20,
  technology: 0.72,
  social: -0.55,
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
      <section className="bg-[#0A0A0A] text-white pt-10 pb-20 sm:pt-12 sm:pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          {/* Mobile: single centered column  |  Desktop: text left, polygon right */}
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-16">

            {/* ── Text column ─────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1">

              {/* Brand badge — mobile only (desktop nav already shows the tagline) */}
              <div className="lg:hidden inline-flex items-center gap-2 mb-7">
                <svg width="20" height="20" viewBox="0 0 28 28" aria-hidden="true">
                  <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="var(--color-accent)" />
                  <polygon
                    points="14,2 25,8 25,20 14,26 3,20 3,8"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinejoin="miter"
                  />
                </svg>
                <span
                  className="text-[var(--color-accent)] font-semibold text-sm tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Poligon · Polygon for Politics
                </span>
              </div>

              {/* Polygon — mobile only, sits between badge and tagline */}
              <div className="lg:hidden mb-5">
                <PoligonShape scores={HERO_SCORES} size={220} variant="abstract" />
              </div>

              {/* Tagline — mobile only (desktop: under polygon in right column) */}
              <p
                className="lg:hidden text-xl text-white/60 font-medium mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                The Shape of Your Politics
              </p>

              {/* Main headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-5"
                style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}
              >
                Your views aren&apos;t{" "}
                <em
                  style={{
                    fontFamily: "var(--font-instrument-serif), Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "var(--color-secondary)",
                  }}
                >
                  one-
                </em>
                <br />
                <span
                  className="text-white px-2 py-0.5 rounded-sm inline-block"
                  style={{ background: "var(--color-accent)" }}
                >
                  dimensional.
                </span>
              </h1>

              {/* Body copy */}
              <p
                className="text-[15px] text-white/55 max-w-sm mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See your political identity, as a multi-colored polygon that&apos;s
                uniquely yours - not a left/right label.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8 text-sm">
                {[
                  { value: "10", label: "dimensions" },
                  { value: "40", label: "questions" },
                  { value: "~5 min", label: "to complete" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-2xl font-bold text-[var(--color-accent)]"
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

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/quiz"
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors text-center"
                >
                  Discover My Shape →
                </Link>
                <Link
                  href="/profiles"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors border border-white/20 text-center"
                >
                  See Example Profiles
                </Link>
              </div>
            </div>

            {/* ── Polygon column — desktop only ───────────────────────── */}
            <div className="hidden lg:flex lg:flex-col lg:flex-shrink-0 lg:items-center lg:justify-center lg:gap-5">
              <PoligonShape scores={HERO_SCORES} size={310} variant="abstract" />
              {/* Tagline under polygon — associates the label with the shape */}
              <p
                className="text-base text-white/55 font-medium text-center"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                The Shape of Your Politics
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Comparison carousel ("They agree more than you think") ───── */}
      <ComparisonCarousel />

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
                icon: (
                  // 3 rows × 4 dots — a Likert-scale answer grid
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    {/* Row 1 — 2nd dot selected */}
                    <circle cx="4"     cy="8"  r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="10.67" cy="8"  r="2.2" fill="var(--color-accent)"/>
                    <circle cx="17.33" cy="8"  r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="24"    cy="8"  r="2.2" fill="rgba(10,10,10,0.15)"/>
                    {/* Row 2 — 4th dot selected */}
                    <circle cx="4"     cy="15" r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="10.67" cy="15" r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="17.33" cy="15" r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="24"    cy="15" r="2.2" fill="var(--color-accent)"/>
                    {/* Row 3 — 3rd dot selected */}
                    <circle cx="4"     cy="22" r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="10.67" cy="22" r="2.2" fill="rgba(10,10,10,0.15)"/>
                    <circle cx="17.33" cy="22" r="2.2" fill="var(--color-accent)"/>
                    <circle cx="24"    cy="22" r="2.2" fill="rgba(10,10,10,0.15)"/>
                  </svg>
                ),
                title: "Answer 40 questions",
                desc: "Rate how much you agree or disagree with statements across 10 topics: things like the economy, healthcare, environment, and personal freedoms.",
              },
              {
                icon: (
                  // Mini irregular polygon — 6 coloured wedge segments
                  <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                    <polygon points="14,14 14,5    19.2,11"   fill="#E8782E"/>
                    <polygon points="14,14 19.2,11  22.66,19"  fill="#8FA82E"/>
                    <polygon points="14,14 22.66,19 14,21.5"  fill="#D4A53C"/>
                    <polygon points="14,14 14,21.5  7.07,18"   fill="#B8385E"/>
                    <polygon points="14,14 7.07,18  9.24,11.25" fill="#4257C9"/>
                    <polygon points="14,14 9.24,11.25 14,5"   fill="#2EA39C"/>
                  </svg>
                ),
                title: "See your unique shape",
                desc: "Each topic becomes one spoke on a coloured polygon. Your answers determine how far each point extends, creating a shape that's yours alone.",
              },
              {
                icon: (
                  // Two overlapping hexagons — you (accent) on left, friend (orange) on right
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <polygon
                      points="9,7 15.06,10.5 15.06,17.5 9,21 2.94,17.5 2.94,10.5"
                      fill="#5560C8" fillOpacity="0.18"
                      stroke="#5560C8" strokeWidth="1.5" strokeLinejoin="round"
                    />
                    <polygon
                      points="19,7 25.06,10.5 25.06,17.5 19,21 12.94,17.5 12.94,10.5"
                      fill="#E8782E" fillOpacity="0.18"
                      stroke="#E8782E" strokeWidth="1.5" strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Compare with a friend",
                desc: "Share your compare link. When a friend takes the quiz and opens it, both polygons appear overlaid. Political difference as geometry, not warfare.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-[#E5E0D2] rounded-2xl flex items-center justify-center mx-auto mb-4">
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
                <PoligonShape scores={HERO_SCORES} size={200} />
              </div>
              <p className="text-xs text-[rgba(10,10,10,0.55)] mt-2 mb-4">
                Each person&apos;s shape is unique. Take the quiz to see yours.
              </p>
              <Link
                href="/quiz"
                className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
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
              <p className="text-[var(--color-accent)] text-xs font-semibold uppercase tracking-widest mb-3">
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
                  <span className="w-3 h-3 rounded-sm bg-[var(--color-accent)]" />
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
                className="inline-block mt-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
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
          <pre className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-left text-xs text-[var(--color-accent)] overflow-x-auto mb-6 font-mono leading-relaxed">
            {`<iframe
  src="https://your-domain.com/embed?data=..."
  width="600" height="520" frameborder="0"
></iframe>`}
          </pre>
          <Link
            href="/quiz"
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </>
  );
}
