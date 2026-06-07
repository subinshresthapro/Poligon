import Link from "next/link";
import PoligonShape from "@/components/PoligonShape";
import AboutSubNav from "@/components/AboutSubNav";
import DonationNudge from "@/components/DonationNudge";

export const metadata = {
  title: "What is Poligon",
  description:
    "Discover Poligon — a 10-dimension political shape that maps your real political identity beyond left and right.",
};

/* ── Example shapes ──────────────────────────────────────────────────────── */

const REFORM_SCORES: Record<string, number> = {
  immigration: 0.88, government: 0.82, economy: 0.78, healthcare: 0.92,
  education: 0.84, environment: 0.91, civilLiberties: 0.79, foreignPolicy: 0.72,
  technology: 0.76, social: 0.90,
};

const TRADITIONAL_SCORES: Record<string, number> = {
  immigration: -0.91, government: -0.84, economy: -0.80, healthcare: -0.87,
  education: -0.82, environment: -0.68, civilLiberties: -0.83, foreignPolicy: -0.76,
  technology: -0.70, social: -0.92,
};

const NUANCED_SCORES: Record<string, number> = {
  immigration: -0.78, government: 0.72, economy: 0.61, healthcare: 0.90,
  education: 0.34, environment: 0.88, civilLiberties: -0.62, foreignPolicy: -0.71,
  technology: 0.44, social: 0.22,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">
      <AboutSubNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
            About Poligon
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Politics is more nuanced
            <br className="hidden sm:inline" /> than a single line.
          </h1>
          <p className="text-[rgba(241,238,229,0.65)] text-base leading-relaxed max-w-xl mx-auto">
            Poligon was built to capture that nuance, and to remind us that the
            people we disagree with are more complex than any label.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/about/why"
              className="inline-block border border-white/20 text-white/80 hover:text-white hover:border-white/50 font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Why we built it →
            </Link>
            <Link
              href="/about/how-it-works"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              How the polygon works ↓
            </Link>
          </div>
        </div>
      </section>

      {/* ── What is the shape ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Section intro */}
          <div className="max-w-2xl mb-14">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              Not a number. A shape.
            </p>
            <h2
              className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] mb-5"
              style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
            >
              Your political identity, rendered as a polygon.
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed text-lg mb-4">
              A "Poligon" is a 10-sided polygon — one spoke per political
              dimension. Two things are encoded simultaneously: how strongly you
              feel, and which direction you lean.
            </p>
            <p className="text-[rgba(10,10,10,0.60)] leading-relaxed">
              The result is a visual fingerprint. No two shapes are exactly
              alike. And unlike a position on a left-right spectrum, your shape
              can show that you hold strong, consistent views across multiple
              dimensions — even when they don&apos;t fit neatly into a single
              ideology.
            </p>
          </div>

          {/* ── Three example polygons ───────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {/* Reform-leaning */}
            <div className="bg-white rounded-2xl border border-[rgba(10,10,10,0.08)] p-6 flex flex-col items-center text-center shadow-sm">
              <div className="mb-5 p-4 bg-[#F1EEE5] rounded-2xl">
                <PoligonShape scores={REFORM_SCORES} size={150} variant="abstract" />
              </div>
              <h3
                className="font-semibold text-[#0A0A0A] mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Reform-leaning
              </h3>
              <p className="text-xs text-[rgba(10,10,10,0.55)] leading-relaxed">
                Strong convictions across most dimensions. Light, pastel tones
                signal reform-oriented views. Full spokes — high conviction,
                clear direction.
              </p>
            </div>

            {/* Traditional-leaning */}
            <div className="bg-white rounded-2xl border border-[rgba(10,10,10,0.08)] p-6 flex flex-col items-center text-center shadow-sm">
              <div className="mb-5 p-4 bg-[#F1EEE5] rounded-2xl">
                <PoligonShape scores={TRADITIONAL_SCORES} size={150} variant="abstract" />
              </div>
              <h3
                className="font-semibold text-[#0A0A0A] mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Traditional-leaning
              </h3>
              <p className="text-xs text-[rgba(10,10,10,0.55)] leading-relaxed">
                Same size polygon — same conviction strength. Deep, rich colours
                signal traditional views. Size is equal; only the shade
                differs.
              </p>
            </div>

            {/* Nuanced */}
            <div className="bg-white rounded-2xl border border-[rgba(10,10,10,0.08)] p-6 flex flex-col items-center text-center shadow-sm">
              <div className="mb-5 p-4 bg-[#F1EEE5] rounded-2xl">
                <PoligonShape scores={NUANCED_SCORES} size={150} variant="abstract" />
              </div>
              <h3
                className="font-semibold text-[#0A0A0A] mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Nuanced &amp; mixed
              </h3>
              <p className="text-xs text-[rgba(10,10,10,0.55)] leading-relaxed">
                Different lengths per spoke — stronger views on some dimensions,
                more open on others. This is the most common shape. Most real
                people live here.
              </p>
            </div>
          </div>

          {/* ── Two encoding rules ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 sm:p-7">
              <p className="text-3xl mb-4">📏</p>
              <h3
                className="font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Spoke length = conviction
              </h3>
              <p className="text-[rgba(241,238,229,0.65)] text-sm leading-relaxed">
                A full-length spoke means strong conviction. A short spoke means
                you&apos;re near-neutral on that axis. A committed progressive
                and a committed conservative both produce a full polygon — the
                difference is in the colour, not the size.
              </p>
            </div>
            <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 sm:p-7">
              <p className="text-3xl mb-4">🎨</p>
              <h3
                className="font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Shade = direction
              </h3>
              <p className="text-[rgba(241,238,229,0.65)] text-sm leading-relaxed">
                Each dimension has its own colour family. A light pastel means
                reform-leaning; a deep, rich shade means traditional-leaning.
                Two people with opposite views produce shapes that are identical
                in size but radically different in colour.
              </p>
            </div>
          </div>

          {/* ── Ten dimensions ──────────────────────────────────────────── */}
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-[rgba(10,10,10,0.40)] text-xs uppercase tracking-widest mb-5">
              The ten dimensions
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { emoji: "🌍", name: "Border Openness"     },
                { emoji: "🏛️", name: "State vs. Market"    },
                { emoji: "💰", name: "Economic Equality"   },
                { emoji: "🏥", name: "Healthcare"          },
                { emoji: "📚", name: "Education"           },
                { emoji: "🌿", name: "Climate Action"      },
                { emoji: "⚖️", name: "Civil Liberties"     },
                { emoji: "🕊️", name: "Military Engagement" },
                { emoji: "💻", name: "Tech Regulation"     },
                { emoji: "🏳️‍🌈", name: "Cultural Change"  },
              ].map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-1.5 bg-white border border-[rgba(10,10,10,0.08)] rounded-full px-3 py-1.5 text-xs text-[rgba(10,10,10,0.70)]"
                >
                  <span>{d.emoji}</span>
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
            <p className="text-[rgba(10,10,10,0.42)] text-xs mt-5 leading-relaxed max-w-lg mx-auto">
              Each dimension is largely independent. Your views on healthcare
              tell us very little about your views on immigration. That
              independence is exactly the point.
            </p>
          </div>

          {/* ── Donation nudge ──────────────────────────────────────────── */}
          <DonationNudge
            copy="If you think politics deserves more than a left-right line, help us draw a better picture."
            className="mb-10"
          />

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div className="text-center">
            <p className="text-[rgba(10,10,10,0.50)] text-sm mb-5">
              Ready to see yours?
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
