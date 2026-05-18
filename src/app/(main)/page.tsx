import Link from "next/link";
import IdeologyGallery from "@/components/IdeologyGallery";
import ScoreLegend from "@/components/ScoreLegend";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span>🗳️</span> Non-partisan civic-tech tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5 tracking-tight">
            Your political views are{" "}
            <span className="text-indigo-400">multidimensional</span>.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Most political tools force you onto a left–right line.{" "}
            <strong className="text-white">Your Political Shape</strong> maps your views
            across 10 dimensions — showing the unique polygon that defines your political
            perspective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors shadow-lg shadow-indigo-900/30"
            >
              Discover Your Shape →
            </Link>
            <Link
              href="/profiles"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors border border-white/20"
            >
              View Sample Profiles
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📝",
                title: "Answer 40 questions",
                desc: "Rate your level of agreement with statements across 10 political categories — immigration, economy, healthcare, environment, and more.",
              },
              {
                step: "2",
                icon: "📐",
                title: "See your shape",
                desc: "Each category becomes one spoke of your radar chart. Your scores determine how far each point extends — creating a shape unique to you.",
              },
              {
                step: "3",
                icon: "🔗",
                title: "Share or embed",
                desc: "Copy your results link, embed the chart on any website with an iframe, or compare your shape to historical political traditions.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center">
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

      {/* How to read section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to read your shape
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                Each spoke represents a topic. Your position on that topic determines
                how far from the center its point sits — from{" "}
                <span className="text-red-600 font-medium">−1 (strongly oppose)</span> at
                the center to{" "}
                <span className="text-emerald-600 font-medium">+1 (strongly support)</span>{" "}
                at the outer edge. The connected points form your unique political shape.
              </p>
              <ScoreLegend />
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-500">
                <strong className="text-slate-700">Note:</strong> Scores reflect position on a specific dimension,
                not a left–right axis. Two people with very different politics
                might both score high on civil liberties for different reasons.
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
              <div className="text-slate-400 text-sm mb-4 font-medium">EXAMPLE SHAPE</div>
              <div className="h-64 flex items-center justify-center text-slate-300 text-4xl">
                {/* Placeholder visual hint */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-full opacity-50" />
                  <div className="absolute inset-8 border-2 border-dashed border-slate-200 rounded-full opacity-40" />
                  <div className="absolute inset-16 border-2 border-dashed border-slate-200 rounded-full opacity-30" />
                  <div className="text-indigo-300 text-5xl">⬡</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Your unique polygon — take the quiz to reveal it.
              </p>
              <Link
                href="/quiz"
                className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
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
          <h2 className="text-2xl font-bold mb-4">
            Built for publishers &amp; journalists
          </h2>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Embed any political shape on your website with a single line of code.
            Display a candidate&apos;s shape directly on a profile page — no
            account required. Data is passed as a simple JSON object.
          </p>
          <pre className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-left text-xs text-emerald-400 overflow-x-auto mb-6 font-mono">
            {`<iframe
  src="https://your-domain.com/embed?data=..."
  width="600" height="520"
  frameborder="0"
></iframe>`}
          </pre>
          <Link
            href="/quiz"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </>
  );
}
