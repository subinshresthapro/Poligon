import Link from "next/link";
import AboutSubNav from "@/components/AboutSubNav";
import DonationSection from "@/components/DonationSection";

export const metadata = {
  title: "How It Works",
  description:
    "The science and art behind Poligon — 10 dimensions, 40 questions, and a polygon built to avoid political bias.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">
      <AboutSubNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
            How it works
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            The science behind the shape.
          </h1>
          <p className="text-[rgba(241,238,229,0.60)] text-base leading-relaxed max-w-xl mx-auto">
            Every design decision was made to avoid the biases that make most
            political quizzes subtly unfair. Here&apos;s exactly how the polygon
            is built.
          </p>
        </div>
      </div>

      {/* ── Steps ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] text-white pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">

          {/* Step 1 — Ten dimensions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 1: Ten dimensions
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Not a line. A shape.
              </h2>
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
                methodology for avoiding acquiescence bias in attitude
                measurement: the tendency for respondents to agree with any
                statement regardless of content.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 2: Forty questions
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Balanced by design, not by accident.
              </h2>
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
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Size = conviction. Shade = direction.
              </h2>
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
                      A short spoke means you&apos;re near-neutral on that
                      axis. A full-length spoke means strong conviction, in
                      either direction. An ultra-conservative and an
                      ultra-progressive will both produce a full-size polygon.
                      The difference is the colour, not the size.
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
                shapes that are the same physical size, just radically different
                in colour.
              </p>
            </div>
          </div>

          {/* Step 4 — How scores are shown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 4: Reading your results
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Conviction strength and lean direction.
              </h2>
              <p className="text-[rgba(241,238,229,0.65)] leading-relaxed mb-5">
                Each dimension shows two pieces of information: how strongly you
                feel, and which direction you lean. Neither piece carries a
                value judgment on its own.
              </p>
              <div className="space-y-3">
                {[
                  {
                    dot: "#1E3A5F",
                    badge: { bg: "#E1F5EE", color: "#085041", label: "Reform" },
                    desc: "Favours change and new approaches on this axis",
                  },
                  {
                    dot: "#C2440A",
                    badge: { bg: "#FAEEDA", color: "#633806", label: "Traditional" },
                    desc: "Favours proven approaches and stability on this axis",
                  },
                  {
                    dot: "rgba(255,255,255,0.25)",
                    badge: {
                      bg: "rgba(255,255,255,0.10)",
                      color: "rgba(241,238,229,0.60)",
                      label: "Mixed",
                    },
                    desc: "Balanced or context-dependent views",
                  },
                ].map((item) => (
                  <div
                    key={item.badge.label}
                    className="flex items-start gap-3 text-xs"
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: item.dot,
                        flexShrink: 0,
                        marginTop: "3px",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        background: item.badge.bg,
                        color: item.badge.color,
                        padding: "1px 6px",
                        borderRadius: "4px",
                        fontWeight: 500,
                        fontSize: "11px",
                        flexShrink: 0,
                      }}
                    >
                      {item.badge.label}
                    </span>
                    <span className="text-[rgba(241,238,229,0.55)]">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
              <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                Why no negative numbers?
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed mb-4">
                The app does not display scores like{" "}
                <code className="text-white bg-white/10 px-1 rounded">
                  -0.93
                </code>{" "}
                or{" "}
                <code className="text-white bg-white/10 px-1 rounded">
                  +0.50
                </code>
                . A negative sign on a conservative score could be read as a
                value judgment. Internally, the math still uses signed values,
                but what you see is always neutral: a percentage and a
                direction.
              </p>
              <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed">
                A 95% Traditional and a 95% Reform score both reflect deeply
                held, consistent convictions. The percentage tells you{" "}
                <em>how strongly</em>; the label tells you{" "}
                <em>which way</em>. Neither is better or worse.
              </p>
            </div>
          </div>

          {/* Step 5 — Public figure scores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                Step 5: Public figure scores
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                How we estimate politician shapes.
              </h2>
              <p className="text-[rgba(241,238,229,0.65)] leading-relaxed mb-5">
                For each public figure, we score all 10 dimensions using the
                same scale you answer on — from −1 (strongly traditional) to +1
                (strongly reform). The estimates draw on multiple public sources
                and are cross-checked wherever possible.
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: "🗳️",
                    label: "Voting record",
                    desc: "GovTrack and VoteSmart aggregate voting history across hundreds of bills per legislator, giving a reliable signal on most dimensions.",
                  },
                  {
                    icon: "📋",
                    label: "Sponsored legislation & platforms",
                    desc: "Bills a politician introduces or co-sponsors reveal priorities more clearly than floor votes, where party pressure can distort the signal.",
                  },
                  {
                    icon: "📐",
                    label: "DW-NOMINATE",
                    desc: "UCLA's multi-dimensional scoring of every US Congress member since 1789 provides a validated baseline for federal legislators.",
                  },
                  {
                    icon: "🗞️",
                    label: "Published statements & policy documents",
                    desc: "Official position papers, campaign platforms, and major speeches — especially for governors and state officials where DW-NOMINATE data is sparse.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 items-start text-xs">
                    <span className="text-base flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-white font-semibold">
                        {item.label} —{" "}
                      </span>
                      <span className="text-[rgba(241,238,229,0.60)]">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-900/30 border border-amber-400/30 rounded-2xl p-5">
                <p className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">
                  Important disclaimer
                </p>
                <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed mb-3">
                  These scores are{" "}
                  <strong className="text-white">
                    approximations for educational purposes only
                  </strong>
                  . A politician&apos;s position on any issue is nuanced,
                  changes over time, and cannot be perfectly captured by a
                  single number. Votes are influenced by party pressure,
                  constituency, and tactical considerations that go beyond
                  stated beliefs.
                </p>
                <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed">
                  Poligon does not endorse any politician or political position.
                  The scores exist purely to give you a rough comparison shape —
                  not a verdict.
                </p>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
                <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-2">
                  State politicians
                </p>
                <p className="text-[rgba(241,238,229,0.70)] text-sm leading-relaxed">
                  For governors and state-level senators, DW-NOMINATE data is
                  often unavailable or incomplete. We rely more heavily on
                  signed legislation, state voting records, policy platforms,
                  and cross-referenced news coverage. State-level estimates
                  carry a wider margin of uncertainty than those for
                  long-serving federal legislators.
                </p>
              </div>
            </div>
          </div>

          {/* ── NEW: The Math Behind the Numbers ──────────────────────────── */}
          <div className="border-t border-white/10 pt-16 sm:pt-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold text-[rgba(241,238,229,0.70)] uppercase tracking-widest mb-4">
                The numbers behind the shape
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
              >
                How conviction % and lean labels are calculated.
              </h2>
              <p className="text-[rgba(241,238,229,0.55)] text-sm leading-relaxed max-w-xl mx-auto">
                Quite a few people have asked what the percentages actually
                mean, and how the Reform / Traditional / Mixed labels are
                assigned. Here&apos;s the honest answer — with one small thing
                kept close to the chest.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                {/* Conviction */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                    Conviction % — how strongly you hold a view
                  </p>
                  <p className="text-[rgba(241,238,229,0.75)] text-sm leading-relaxed mb-3">
                    The conviction percentage runs from 0 % to 100 %. A score of
                    0 % means your answers on that dimension were balanced — they
                    pointed in different directions and largely cancelled each
                    other out. A score of 100 % means every answer on that
                    dimension pointed the same way, at maximum intensity.
                  </p>
                  <p className="text-[rgba(241,238,229,0.60)] text-sm leading-relaxed">
                    The key insight: two people can both score 92 % conviction on
                    immigration and land on opposite ends of the spectrum. The
                    percentage tells you <em>how strongly</em>; it says nothing
                    about <em>which way</em>.
                  </p>
                </div>

                {/* Lean labels */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                    Reform · Traditional · Mixed — which way you lean
                  </p>
                  <p className="text-[rgba(241,238,229,0.75)] text-sm leading-relaxed mb-4">
                    The lean label collapses the direction of your score into
                    three readable categories:
                  </p>
                  <div className="space-y-2.5 mb-4">
                    {[
                      {
                        label: "Reform",
                        bg: "#E1F5EE",
                        color: "#085041",
                        desc: "Your answers signal openness to change and new approaches on this axis.",
                      },
                      {
                        label: "Traditional",
                        bg: "#FAEEDA",
                        color: "#633806",
                        desc: "Your answers signal preference for proven approaches and stability.",
                      },
                      {
                        label: "Mixed",
                        bg: "rgba(255,255,255,0.10)",
                        color: "rgba(241,238,229,0.65)",
                        desc: "Your answers were balanced, or pointed in different directions across the questions.",
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 text-xs">
                        <span
                          style={{
                            background: item.bg,
                            color: item.color,
                            padding: "2px 7px",
                            borderRadius: "4px",
                            fontWeight: 600,
                            fontSize: "11px",
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        >
                          {item.label}
                        </span>
                        <span className="text-[rgba(241,238,229,0.55)] leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* The maths — kept slightly vague */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                    The maths
                  </p>
                  <p className="text-[rgba(241,238,229,0.75)] text-sm leading-relaxed mb-3">
                    Internally, each dimension is scored on a continuous
                    numerical scale. The conviction percentage is derived from
                    the <em>magnitude</em> of that score — the direction is
                    stripped away before the percentage is computed. This is why
                    a 95 % Traditional and a 95 % Reform score look identical in
                    terms of spoke length, and only differ in shade.
                  </p>
                  <p className="text-[rgba(241,238,229,0.60)] text-sm leading-relaxed">
                    We don&apos;t publish the full scoring formula. What we will
                    say is that it is deliberately simple — no machine learning,
                    no hidden weighting, no partisan calibration. The goal was a
                    model that a student could reconstruct from the quiz
                    questions alone, given enough time.
                  </p>
                </div>

                {/* The threshold */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                    The neutrality threshold
                  </p>
                  <p className="text-[rgba(241,238,229,0.75)] text-sm leading-relaxed mb-3">
                    A lean label of &quot;Mixed&quot; doesn&apos;t mean you have
                    no opinion. It means your responses on that dimension were
                    close enough to neutral that neither &quot;Reform&quot; nor
                    &quot;Traditional&quot; would be an accurate description.
                  </p>
                  <p className="text-[rgba(241,238,229,0.60)] text-sm leading-relaxed">
                    We use a small threshold to separate genuine leans from
                    statistical noise — roughly the equivalent of
                    &quot;slightly agree&quot; vs. &quot;strongly agree&quot;
                    on a single question. Below that threshold, the shape speaks
                    for itself: a short spoke with muted colouring.
                  </p>
                </div>

                {/* No manipulation */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                  <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest mb-3">
                    No nudging, no normalisation to a population
                  </p>
                  <p className="text-[rgba(241,238,229,0.75)] text-sm leading-relaxed">
                    Your scores are not adjusted relative to other
                    users&apos; answers. A 70 % Reform score means 70 % of the
                    maximum possible conviction on that axis — not &quot;70 % of
                    people lean more traditional than you.&quot; The polygon
                    reflects your answers, and only yours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sources grid ──────────────────────────────────────────────── */}
          <div className="border-t border-white/10 pt-10">
            <p className="text-[rgba(241,238,229,0.40)] text-xs uppercase tracking-widest text-center mb-6">
              Research sources &amp; methodology
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Pew Research Center",
                  desc: "Political Typology studies (1987–2023), the primary framework for the 10 dimensions.",
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
                  <p className="text-white text-xs font-semibold mb-1">{s.name}</p>
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="py-16 px-4 sm:px-6 bg-[#F1EEE5]">
        <div className="max-w-2xl mx-auto text-center mb-12">
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
        <div className="max-w-3xl mx-auto">
          <DonationSection compact copy="Glad the methodology is honest? Help keep the project free and independent." />
        </div>
      </div>

    </div>
  );
}
