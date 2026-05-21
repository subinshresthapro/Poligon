import Link from "next/link";
import NavActions from "@/components/NavActions";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl">⬡</span>
            <div className="leading-none">
              <span
                className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Your Political Shape
              </span>
            </div>
          </Link>
          <NavActions />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">⬡</span>
              <span className="font-semibold text-slate-700 text-sm">Your Political Shape</span>
            </div>
            <div className="text-center text-xs text-slate-400 space-y-1">
              <p>Non-partisan · For educational purposes only · No endorsement implied</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <Link href="/profiles" className="hover:text-slate-600 transition-colors">Profiles</Link>
              <Link href="/quiz" className="hover:text-slate-600 transition-colors">Take Quiz</Link>
              <Link href="/embed" className="hover:text-slate-600 transition-colors">Embed</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
