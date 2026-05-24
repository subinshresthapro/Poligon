import Link from "next/link";
import AboutSubNav from "@/components/AboutSubNav";

export const metadata = {
  title: "Our Story",
  description:
    "Who built Poligon, why, and the principles it was built on.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">
      <AboutSubNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
            Our story
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Built by citizens,
            <br className="hidden sm:inline" /> for citizens.
          </h1>
          <p className="text-[rgba(241,238,229,0.60)] text-base leading-relaxed">
            No party. No campaign. No corporate interest. Just a frustration
            with flat maps and a belief that people deserve better tools for
            understanding each other.
          </p>
        </div>
      </section>

      {/* ── Who built this ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-10">

          <div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Who built this?
            </h2>
            <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
              <p>
                Poligon was built by ordinary people. Not a political party, not
                a campaign, not a think tank, and not a corporation. No political
                organisation has funded it, directed it, or had any say in its
                design. No one in politics has paid for it. No corporate interest
                is behind it.
              </p>
              <p>
                It started from a simple frustration: the tools we are given to
                understand politics flatten everything into a single line and sort
                people into opposing camps. We wanted something that showed the
                real texture of people&apos;s views.
              </p>
              <p>
                The goal is to bridge the divide, not widen it. To help people
                find the common ground that gets lost in the noise. Built by
                citizens, for citizens.
              </p>
            </div>
          </div>

          {/* ── Principles ────────────────────────────────────────────────── */}
          <div className="bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] rounded-2xl p-6 sm:p-8">
            <h3
              className="font-bold text-[#0A0A0A] mb-5"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Our principles
            </h3>
            <ul className="space-y-3 text-sm text-[rgba(10,10,10,0.70)]">
              {[
                "Non-partisan: the tool does not favour any political position.",
                "No data collection: your answers stay in your browser.",
                "Educational, not definitive: scores are approximations, not verdicts.",
                "No endorsements: politician profiles are for comparison only.",
                "Built to spark conversation, not division.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[var(--color-accent)] flex-shrink-0 mt-0.5 font-semibold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── What we're not ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                heading: "Not a poll",
                body: "We don't aggregate your answers. We don't know what you chose. There are no servers recording responses. Everything stays in your browser.",
              },
              {
                heading: "Not partisan",
                body: "No question is designed to nudge you toward a particular answer. Both ends of every dimension are treated with equal weight and respect.",
              },
              {
                heading: "Not definitive",
                body: "A polygon is a starting point for reflection, not a verdict. Your views are more complex than any shape. We know that.",
              },
            ].map((card) => (
              <div
                key={card.heading}
                className="bg-white rounded-2xl border border-[rgba(10,10,10,0.08)] p-5 shadow-sm"
              >
                <h4
                  className="font-semibold text-[#0A0A0A] mb-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {card.heading}
                </h4>
                <p className="text-xs text-[rgba(10,10,10,0.60)] leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <div className="text-center pt-4">
            <p className="text-[rgba(10,10,10,0.55)] text-sm mb-5">
              Ready to see your shape?
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Take the Quiz →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
