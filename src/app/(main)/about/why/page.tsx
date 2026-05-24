import Link from "next/link";
import AboutSubNav from "@/components/AboutSubNav";
import WhyPanels from "@/components/WhyPanels";

export const metadata = {
  title: "Why We Built It",
  description:
    "Why political nuance matters — and why Poligon exists to capture it.",
};

const PANELS = [
  {
    title: "The problem with a line",
    body: (
      <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
        <p>
          For more than a century, political thought has been crammed onto a
          single left-to-right axis. That axis captures some things: attitudes
          toward economic inequality, the role of markets, state power. But it
          completely misses others: civil liberties, foreign policy,
          environmental values, how you feel about technology, or your views on
          immigration.
        </p>
        <p>
          Reducing someone&apos;s political identity to a single point on a
          spectrum doesn&apos;t just oversimplify. It distorts. It forces false
          solidarity (people who agree on almost nothing end up on the same
          &quot;team&quot;) and false conflict (people who agree on most things
          are told they&apos;re opponents). The line is a tool for organising
          elections, not for understanding people.
        </p>
      </div>
    ),
  },
  {
    title: "Nuance is not weakness",
    body: (
      <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
        <p>
          In public discourse, &quot;nuanced views&quot; has become almost an
          insult: a sign that you&apos;re not committed, not decisive. But
          holding a mix of views is not the same as having no views. It usually
          means you&apos;ve thought carefully.
        </p>
        <p>
          Someone can believe strongly in free markets AND in universal
          healthcare. Someone can oppose foreign military intervention AND
          support stricter immigration enforcement. Someone can be deeply
          concerned about climate change AND sceptical of the government&apos;s
          ability to manage the economy well. These combinations exist in real
          people every day, but our political systems rarely have room for them.
        </p>
        <p>Poligon gives those combinations a shape.</p>
      </div>
    ),
  },
  {
    title: "Politics is not a sport",
    body: (
      <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
        <p>
          Sports are designed to produce a winner. Two sides enter, one leaves
          victorious. The goal is domination, not understanding. When we treat
          politics as tribal, zero-sum, winner-take-all, we drain it of its
          actual purpose: collective problem-solving for people who disagree.
        </p>
        <p>
          Compromise isn&apos;t betrayal. It&apos;s how democratic societies
          function. Almost every major policy outcome that has improved lives
          was the product of negotiation, coalition-building, and meeting people
          partway. Civil rights legislation, public health systems, environmental
          protections: all products of compromise.
        </p>
        <p>
          A tool that helps you see where your views actually overlap with people
          you disagree with is more useful than one that confirms you&apos;re on
          the right team.
        </p>
      </div>
    ),
  },
  {
    title: "Politics shapes every life, whether we engage or not",
    body: (
      <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
        <p>
          It determines whether hospitals are funded. Whether your water is
          clean. Whether your children&apos;s school has textbooks. Whether you
          can afford to get sick. Whether the person living next door feels safe.
        </p>
        <p>
          Political disengagement is understandable. The system can feel broken,
          discourse toxic, and choices depressing. But stepping back doesn&apos;t
          make those decisions disappear. It just hands them to others.
        </p>
        <p>
          Poligon was built for people who want to think about their values.
          Not to tell them what to think, but to give them a clearer picture of
          where they stand and why it matters.
        </p>
      </div>
    ),
  },
  {
    title: "A global perspective",
    body: (
      <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
        <p>
          What counts as &quot;left&quot; or &quot;right&quot; varies enormously
          by country. A centrist in Sweden might be considered far-left in the
          United States. A conservative in Japan might hold views
          indistinguishable from a European social democrat on some issues. The
          labels travel badly.
        </p>
        <p>
          Poligon&apos;s 10 dimensions are broadly applicable across political
          contexts worldwide. The tool isn&apos;t calibrated to any single
          country&apos;s political landscape. That&apos;s by design. Political
          identity is human. The shape is yours.
        </p>
      </div>
    ),
  },
  {
    title: "Human empathy in political conversation",
    body: (
      <div className="space-y-4 text-[rgba(10,10,10,0.70)] leading-relaxed">
        <p>
          Behind every political view is a person with a story. Someone who grew
          up watching their town&apos;s jobs disappear. Someone whose family
          came here with nothing and built something. Someone who has seen
          firsthand what happens when institutions fail, or when they work
          exactly as they should.
        </p>
        <p>
          Poligon won&apos;t fix political polarisation. But if it helps even a
          few conversations start from &quot;here&apos;s my shape, show me
          yours&quot; instead of &quot;you&apos;re either with us or against
          us&quot;, that&apos;s worth doing.
        </p>
      </div>
    ),
  },
];

export default function WhyPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">
      <AboutSubNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
            Why we built it
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            The world doesn&apos;t fit on a single line.
          </h1>
          <p className="text-[rgba(241,238,229,0.60)] text-base leading-relaxed">
            Six reasons Poligon exists — and why we think it matters.
          </p>
        </div>
      </section>

      {/* ── Staggered panels ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <WhyPanels panels={PANELS} />
      </section>

      {/* ── Footer CTA ────────────────────────────────────────────────────── */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#0A0A0A] text-white rounded-2xl p-8">
          <div>
            <p
              className="font-semibold text-lg mb-1"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              See the shape of your politics.
            </p>
            <p className="text-[rgba(241,238,229,0.55)] text-sm">
              40 questions · 10 dimensions · your unique polygon.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/about/how-it-works"
              className="text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/quiz"
              className="text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
