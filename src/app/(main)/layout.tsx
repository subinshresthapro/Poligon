import Link from "next/link";
import NavActions from "@/components/NavActions";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Hexagon brand mark with gradient */}
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
              <polygon
                points="14,2 25,8 25,20 14,26 3,20 3,8"
                fill="url(#hdr-grad)"
                stroke="none"
              />
              <defs>
                <linearGradient id="hdr-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="leading-none">
              <span
                className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Poligon
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
              <svg width="20" height="20" viewBox="0 0 28 28" aria-hidden="true">
                <polygon
                  points="14,2 25,8 25,20 14,26 3,20 3,8"
                  fill="url(#ftr-grad)"
                />
                <defs>
                  <linearGradient id="ftr-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-semibold text-slate-700 text-sm">Poligon</span>
            </div>
            <div className="text-center text-xs text-slate-400">
              <p>Built to spark conversation, not division</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <Link href="/profiles" className="hover:text-slate-600 transition-colors">Profiles</Link>
              <Link href="/about" className="hover:text-slate-600 transition-colors">About</Link>
              <Link href="/quiz" className="hover:text-slate-600 transition-colors">Take Quiz</Link>
              <Link href="/embed" className="hover:text-slate-600 transition-colors">Embed</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
