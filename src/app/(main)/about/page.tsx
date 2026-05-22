import Link from "next/link";

export const metadata = {
  title: "About | Poligon",
  description:
    "Why political nuance matters, and how Poligon's 10-dimension polygon captures it without bias.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#5560C8] text-sm font-semibold uppercase tracking-widest mb-4">
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
            <a
              href="#why"
              className="inline-block border border-white/20 text-white/80 hover:text-white hover:border-white/50 font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Why we built it
            </a>
            <a
              href="#how"
              className="inline-block bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              How the polygon works ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY ─────────────────────────────────────────────────────────────── */}
      <div id="why" className="py-16 px-4 sm:px-6 bg-[#F1EEE5]">
        <div className="max-w-2xl mx-auto space-y-16">

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
              For more than a century, political thought has been crammed onto a
              single left-to-right axis. That axis captures some things: attitudes
              toward economic inequality, the role of markets, state power. But it
              completely misses others: civil liberties, foreign policy,
              environmental values, how you feel about technology, or your views on
              immigration.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Reducing someone&apos;s political identity to a single point on a
              spectrum doesn&apos;t just oversimplify. It distorts. It forces false
              solidarity (people who agree on almost nothing end up on the same
              &quot;team&quot;) and false conflict (people who agree on most things
              are told they&apos;re opponents). The line is a tool for organising
              elections, not for understanding people.
            </p>
          </div>

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
              In public discourse, &quot;nuanced views&quot; has become almost an
              insult: a sign that you&apos;re not committed, not decisive. But
              holding a mix of views is not the same as having no views. It usually
              means you&apos;ve thought carefully.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Someone can believe strongly in free markets AND in universal
              healthcare. Someone can oppose foreign military intervention AND
              support stricter immigration enforcement. Someone can be deeply
              concerned about climate change AND sceptical of the government&apos;s
              ability to manage the economy well. These combinations exist in real
              people every day, but our political systems rarely have room for them.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon gives those combinations a shape.
            </p>
          </div>

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
              Sports are designed to produce a winner. Two sides enter, one leaves
              victorious. The goal is domination, not understanding. When we treat
              politics as tribal, zero-sum, winner-take-all, we drain it of its
              actual purpose: collective problem-solving for people who disagree.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Compromise isn&apos;t betrayal. It&apos;s how democratic societies
              function. Almost every major policy outcome that has improved lives
              was the product of negotiation, coalition-building, and meeting people
              partway. Civil rights legislation, public health systems, environmental
              protections: all products of compromise.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              A tool that helps you see where your views actually overlap with people
              you disagree with is more useful than one that confirms you&apos;re on
              the right team.
            </p>
          </div>

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
              It determines whether hospitals are funded. Whether your water is
              clean. Whether your children&apos;s school has textbooks. Whether you
              can afford to get sick. Whether the person living next door feels safe.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed mb-4">
              Political disengagement is understandable. The system can feel broken,
              discourse toxic, and choices depressing. But stepping back doesn&apos;t
              make those decisions disappear. It just hands them to others.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon was built for people who want to think about their values.
              Not to tell them what to think, but to give them a clearer picture of
              where they stand and why it matters.
            </p>
          </div>

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
              What counts as &quot;left&quot; or &quot;right&quot; varies enormously
              by country. A centrist in Sweden might be considered far-left in the
              United States. A conservative in Japan might hold views
              indistinguishable from a European social democrat on some issues. The
              labels travel badly.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon&apos;s 10 dimensions are broadly applicable across political
              contexts worldwide. The tool isn&apos;t calibrated to any single
              country&apos;s political landscape. That&apos;s by design. Political
              identity is human. The shape is yours.
            </p>
          </div>

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
              Behind every political view is a person with a story. Someone who grew
              up watching their town&apos;s jobs disappear. Someone whose family
              came here with nothing and built something. Someone who has seen
              firsthand what happens when institutions fail, or when they work
              exactly as they should.
            </p>
            <p className="text-[rgba(10,10,10,0.70)] leading-relaxed">
              Poligon won&apos;t fix political polarisation. But if it helps even a
              few conversations start from &quot;here&apos;s my shape, show me
              yours&quot; instead of &quot;you&apos;re either with us or against
              us&quot;, that&apos;s worth doing.
            </p>
          </div>

        </div>
      </div>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <div id="how" className="bg-[#0A0A0A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-[#5560C8] text-sm font-semibold uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2
            className="text-2xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            The science behind the shape
          </h2>
          <p className="text-[rgba(241,238,229,0.60)] text-base leading-relaxed max-w-xl mx-auto">
            Every design decision was made to avoid the biases that make most
            political quizzes subtly unfair. Here&apos;s exactly how the polygon
            is built.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">

          {/* Step 1 — Ten dimensions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 1: Ten dimensions
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Not a line. A shape.
              </h3>
              <p className="text-[rgba(241,238,229,0.65)] leading-relaxed mb-5">
                Traditional political tests measure you on a single axis: left
                vs. right, liberal vs. conservative. Poligon measures ten
                independent dimensions, because political identity simply is not
                one-dimensional.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { emoji: "🌍", name: "Border Openness" },
                  { emoji: "🏛️", name: "State vs. Market" },
                  { emoji: "💰", name: "Economic Equality" },
                  { emoji: "🏥", name: "Healthcare" },
                  { emoji: "📚", name: "Education" },
                  { emoji: "🌿", name: "Climate Action" },
                  { emoji: "⚖️", name: "Individual Freedom" },
                  { emoji: "🕊️", name: "Military Engagement" },
                  { emoji: "💻", name: "Tech Regulation" },
                  { emoji: "🏳️‍🌈", name: "Cultural Change" },
                ].map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center gap-2 bg-white/[0.06] rounded-lg px-3 py-2 text-xs text-[rgba(241,238,229,0.80)]"
                  >
                    <span>{d.emoji}</span>
                    <span>{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
              <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                Why ten?
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed mb-4">
                These dimensions are drawn from the framework used by the{" "}
                <strong className="text-white">Pew Research Center</strong> in
                its Political Typology studies, one of the most-cited
                multi-axis frameworks in political science, mapping American
                political values since the 1980s.
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed">
                Each dimension is largely independent: your views on healthcare
                funding tell us very little about your views on military
                spending. That independence is why a single axis falls short,
                and why a polygon with ten spokes captures something truer.
              </p>
            </div>
          </div>

          {/* Step 2 — Forty questions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 lg:order-last">
              <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                The balance rule
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed mb-4">
                For each dimension, exactly two questions are written from a
                progressive framing and two from a conservative framing. A
                committed conservative who &quot;Strongly Agrees&quot; with
                conservative-framed questions scores just as high a conviction
                level as a committed progressive. Not lower.
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed">
                This symmetry is informed by best-practice guidelines from{" "}
                <strong className="text-white">
                  American National Election Studies (ANES)
                </strong>{" "}
                methodology for avoiding acquiescence bias in attitude measurement:
                the tendency for respondents to agree with any statement
                regardless of content.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 2: Forty questions
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Balanced by design, not by accident
              </h3>
              <p className="text-[rgba(241,238,229,0.65)] leading-relaxed mb-5">
                Most political quizzes ask questions that are subtly easier to
                agree with if you lean progressive, because they were written
                by people who lean progressive. We deliberately designed around
                this.
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "Progressive-framed (P): 2 per dimension",
                    example:
                      '"Asylum seekers should receive a full legal hearing before any deportation decision is made."',
                    color: "#9FE1CB",
                  },
                  {
                    label: "Conservative-framed (C): 2 per dimension",
                    example:
                      '"A country has the right and responsibility to strictly control who crosses its borders."',
                    color: "#C2440A",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/[0.06] rounded-xl p-4 border-l-2"
                    style={{ borderColor: item.color }}
                  >
                    <p
                      className="text-xs font-semibold mb-1.5"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[rgba(241,238,229,0.60)] text-xs leading-relaxed italic">
                      {item.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 — The polygon */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 3: The polygon
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Size = conviction. Shade = direction.
              </h3>
              <p className="text-[rgba(241,238,229,0.65)] leading-relaxed mb-5">
                Your polygon encodes two things simultaneously: how strongly
                you feel, and which direction you lean. It uses visual language
                rather than numbers.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                    📏
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">
                      Spoke length = conviction strength
                    </p>
                    <p className="text-[rgba(241,238,229,0.60)] text-xs leading-relaxed">
                      A short spoke means you&apos;re near-neutral on that axis.
                      A full-length spoke means strong conviction, in either
                      direction. An ultra-conservative and an ultra-progressive
                      will both produce a full-size polygon. The difference is
                      the colour, not the size.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                    🎨
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">
                      Wedge shade = direction
                    </p>
                    <p className="text-[rgba(241,238,229,0.60)] text-xs leading-relaxed">
                      Each dimension has its own colour family. A{" "}
                      <strong className="text-[#C4B0E8]">light pastel</strong>{" "}
                      means progressive lean;{" "}
                      <strong className="text-[#3A1F7A]">
                        a deep dark shade
                      </strong>{" "}
                      means conservative lean. Two extreme profiles look
                      completely different even at identical size. One is a
                      pastel rainbow, the other a rich jewel-tone palette.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
              <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                Why this approach avoids bias
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed mb-4">
                Most visualisations put &quot;left&quot; on one side and
                &quot;right&quot; on the other, making the larger side look
                dominant. Poligon avoids this entirely. There is no
                &quot;bigger&quot; or &quot;better&quot; polygon; only stronger
                or weaker conviction, and different shading.
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed mb-4">
                This design is informed by the{" "}
                <strong className="text-white">Nolan Chart</strong> (the first
                two-axis political map, 1969) and academic work on
                multi-dimensional scaling in political science, including the{" "}
                <strong className="text-white">DW-NOMINATE</strong> scoring
                system developed at UCLA, used to score every U.S. Congress
                member since 1789.
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed">
                There is no red vs. blue, no left vs. right label on the
                polygon. Two people with opposite views on every axis produce
                shapes that are the same physical size, just radically
                different in colour.
              </p>
            </div>
          </div>

          {/* Sources grid */}
          <div className="border-t border-white/10 pt-10">
            <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest text-center mb-6">
              Research sources &amp; methodology
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Pew Research Center",
                  desc: "Political Typology studies (1987-2023), the primary framework for the 10 dimensions.",
                },
                {
                  name: "DW-NOMINATE (UCLA)",
                  desc: "Multi-dimensional political scoring system used to estimate politician positions.",
                },
                {
                  name: "ANES Methodology",
                  desc: "Guidelines for balanced survey design and avoiding acquiescence bias in attitude measurement.",
                },
                {
                  name: "GovTrack / VoteSmart",
                  desc: "Voting-record databases used to source politician profile estimates.",
                },
                {
                  name: "Nolan Chart (1969)",
                  desc: "The original two-axis political map that pioneered multi-dimensional political thinking.",
                },
                {
                  name: "World Values Survey",
                  desc: "Cross-national research on values underpinning the globally applicable dimension design.",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4"
                >
                  <p className="text-white text-xs font-semibold mb-1">
                    {s.name}
                  </p>
                  <p className="text-[rgba(241,238,229,0.50)] text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-[rgba(241,238,229,0.35)] text-xs mt-6 leading-relaxed max-w-xl mx-auto">
              Scores are educational approximations, not clinical assessments.
              Politician profiles are derived from public records and published
              for comparison purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* ── Principles + CTA ────────────────────────────────────────────────── */}
      <div className="py-16 px-4 sm:px-6 bg-[#F1EEE5]">
        <div className="max-w-2xl mx-auto space-y-10">
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
                  <span className="text-[#5560C8] flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

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
