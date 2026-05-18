import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg">🗳️</span>
            <span className="font-bold text-slate-900 tracking-tight">
              Your Political Shape
            </span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/profiles" className="text-slate-500 hover:text-slate-800 transition-colors">
              Profiles
            </Link>
            <Link
              href="/quiz"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
            >
              Take the Quiz
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-slate-400 space-y-1">
          <p>
            Your Political Shape is a non-partisan civic-tech tool for exploring multidimensional political views.
          </p>
          <p>
            Results are for educational purposes only and do not constitute endorsement of any political position.
          </p>
        </div>
      </footer>
    </div>
  );
}
