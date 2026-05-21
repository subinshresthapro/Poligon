import Link from "next/link";

export const metadata = {
  title: "About — Poligon",
  description:
    "Why political nuance matters, and why we built Poligon to capture it.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#5560C8] text-sm font-semibold uppercase tracking-widest mb-4">
            About Poligon
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Politics is more nuanced<br className="hidden sm:inline" /> than a single line.
          </h1>
          <p className="text-[rgba(241,238,229,0.65)] text-base leading-relaxed max-w-xl mx-auto">
            Poligon was built to capture that nuance, and to remind us that the people
            we disagree with are more complex than any label.
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-16">

          {/* Section 1: The problem with a line */}
          <div>
            <div className="w-12 h-12 bg-[#E5E0D2] rounded-2xl flex items-center justify-center text-2xl mb-5">
              📏
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              The problem with a line
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              For more than a century, political thought has been crammed onto a single
              left-to-right axis. That axis captures some things: attitudes toward economic
              inequality, the role of markets, state power. But it completely misses others:
              civil liberties, foreign policy, environmental values, how you feel about
              technology, or your views on immigration.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Reducing someone&apos;s political identity to a single point on a spectrum
              doesn&apos;t just oversimplify. It distorts. It forces false solidarity
              (people who agree on almost nothing end up on the same &quot;team&quot;) and
              false conflict (people who agree on most things are told they&apos;re
              opponents). The line is a tool for organising elections, not for understanding people.
            </p>
          </div>

          {/* Section 2: Nuance is not weakness */}
          <div>
            <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🧩
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Nuance is not weakness
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              In public discourse, &quot;nuanced views&quot; has become almost an insult, a sign
              that you&apos;re not committed, not decisive. But holding a mix of views is not the
              same as having no views. It usually means you&apos;ve thought carefully.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Someone can believe strongly in free markets AND in universal healthcare.
              Someone can oppose foreign military intervention AND support stricter immigration
              enforcement. Someone can be deeply concerned about climate change AND sceptical
              of the government&apos;s ability to manage the economy well. These combinations
              exist in real people every day, but our political systems rarely have room for them.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon gives those combinations a shape.
            </p>
          </div>

          {/* Section 3: Politics as a sport */}
          <div>
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
              ⚽
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Politics is not a sport
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Sports are designed to produce a winner. Two sides enter, one leaves victorious.
              The goal is domination, not understanding. When we treat politics the same way -
              tribal, zero-sum, winner-take-all - we drain it of its actual purpose: collective
              problem-solving for people who disagree.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Compromise isn&apos;t betrayal. It&apos;s how democratic societies function.
              Almost every major policy outcome that has improved lives - civil rights legislation,
              public health systems, environmental protections - was the product of negotiation,
              coalition-building, and meeting people partway.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              A tool that helps you see where your views actually overlap with people you disagree
              with is more useful than one that confirms you&apos;re on the right team.
            </p>
          </div>

          {/* Section 4: Politics shapes everyone's life */}
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🌱
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Politics shapes every life, whether we engage or not
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              It determines whether hospitals are funded. Whether your water is clean.
              Whether your children&apos;s school has textbooks. Whether you can afford
              to get sick. Whether the person living next door feels safe.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Political disengagement is understandable. The system can feel broken,
              discourse toxic, and choices depressing. But stepping back doesn&apos;t make
              those decisions disappear. It just hands them to others.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon was built for people who want to think about their values, not to
              tell them what to think, but to give them a clearer picture of where they stand
              and why it matters.
            </p>
          </div>

          {/* Section 5: A global perspective */}
          <div>
            <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🌏
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              A global perspective
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              What counts as &quot;left&quot; or &quot;right&quot; varies enormously by country. A centrist
              in Sweden might be considered far-left in the United States. A conservative in
              Japan might hold views indistinguishable from a European social democrat on
              some issues. The labels travel badly.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Poligon&apos;s 10 dimensions - immigration, government role, economy, healthcare,
              education, environment, civil liberties, foreign policy, technology governance,
              and social values - are broadly applicable across political contexts worldwide.
              The tool isn&apos;t calibrated to any single country&apos;s political landscape.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              That&apos;s by design. Political identity is human. The shape is yours.
            </p>
          </div>

          {/* Section 6: Human empathy */}
          <div>
            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🤝
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Human empathy in political conversation
            </h2>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Behind every political view is a person with a story. Someone who grew up
              watching their town&apos;s jobs disappear. Someone whose family came here with
              nothing and built something. Someone who has seen firsthand what happens when
              institutions fail, or when they work exactly as they should.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Political disagreement becomes toxic when we forget this. When we argue with
              abstractions (&quot;the left,&quot; &quot;conservatives,&quot; &quot;elites&quot;) instead of with the actual
              humans who hold those views, who are usually more complicated than the label.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon won&apos;t fix political polarisation. But if it helps even a few conversations
              start from &quot;here&apos;s my shape, show me yours&quot; instead of
              &quot;you&apos;re either with us or against us&quot; - that&apos;s worth doing.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-[rgba(10,10,10,0.08)] pt-8">
            <div className="bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] rounded-2xl p-6">
              <h3
                className="font-bold text-[#0A0A0A] mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Our principles
              </h3>
              <ul className="space-y-2 text-sm text-[rgba(10,10,10,0.70)]">
                {[
                  "Non-partisan: the tool does not favour any political position.",
                  "No data collection: your answers stay in your browser.",
                  "Educational, not definitive: scores are approximations, not verdicts.",
                  "No endorsements: politician profiles are for comparison only.",
                  "Built to spark conversation, not division.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#5560C8] flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[rgba(10,10,10,0.55)] text-sm mb-5">
              Ready to see your shape?
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
