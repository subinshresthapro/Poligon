import Link from "next/link";
import IdeologyGallery from "@/components/IdeologyGallery";
import ScoreLegend from "@/components/ScoreLegend";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Your views are not one-dimensional
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}
          >
            What does your{" "}
            <span className="text-indigo-400">political shape</span>{" "}
            look like?
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Most tools put you on a line — left or right. We map your views across{" "}
            <strong className="text-white">10 different dimensions</strong>, creating a polygon
            that&apos;s uniquely yours.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
            {[
              { value: "10", label: "dimensions" },
              { value: "40", label: "questions" },
              { value: "~5 min", label: "to complete" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-indigo-400" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {value}
                </div>
                <div className="text-slate-400 text-xs uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-indigo-900/40"
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

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}>
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
                desc: "Each topic becomes one spoke on a radar chart. Your answers determine how far each point extends from the center.",
              },
              {
                icon: "🔗",
                title: "Share or embed",
                desc: "Copy a link to your results, embed the chart anywhere with an iframe, or compare your shape to different political traditions.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to read */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}>
                How to read your shape
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                Each spoke represents one topic. How far a point extends from the center
                shows how strongly you feel about it — from{" "}
                <span className="text-red-600 font-medium">−1 (strongly disagree)</span> at
                the center to{" "}
                <span className="text-emerald-600 font-medium">+1 (strongly agree)</span>{" "}
                at the outer edge. The connected points form your unique shape.
              </p>
              <ScoreLegend />
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-500">
                <strong className="text-slate-700">Important:</strong> Scores reflect your
                position on a specific dimension, not a left–right axis. Two people with
                very different politics can both score high on civil liberties — for
                completely different reasons.
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
                Your shape will look something like this
              </div>
              <div className="flex items-center justify-center" style={{ height: 200 }}>
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-full opacity-50" />
                  <div className="absolute inset-8 border-2 border-dashed border-slate-200 rounded-full opacity-40" />
                  <div className="absolute inset-16 border-2 border-dashed border-slate-200 rounded-full opacity-30" />
                  <div
                    className="text-indigo-400 text-6xl select-none"
                    style={{ fontFamily: "system-ui" }}
                  >
                    ⬡
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 mb-4">
                Each person&apos;s shape is unique — take the quiz to see yours.
              </p>
              <Link
                href="/quiz"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Reveal My Shape
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ideology gallery */}
      <IdeologyGallery />

      {/* Embed CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Built for publishers &amp; journalists
          </h2>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Embed any political shape on your website with one line of code.
            Perfect for candidate profiles, voter guides, or news articles.
            No account required — data is passed as a simple JSON object.
          </p>
          <pre className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-left text-xs text-emerald-400 overflow-x-auto mb-6 font-mono leading-relaxed">
            {`<iframe
  src="https://your-domain.com/embed?data=..."
  width="600" height="520" frameborder="0"
></iframe>`}
          </pre>
          <Link
            href="/quiz"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </>
  );
}
