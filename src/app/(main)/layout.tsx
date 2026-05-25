import Link from "next/link";
import NavActions from "@/components/NavActions";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#F1EEE5] border-b border-[rgba(10,10,10,0.12)] sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Hex mark: wine outline + accent inner polygon */}
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
              <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="var(--color-accent)" />
              <polygon
                points="14,2 25,8 25,20 14,26 3,20 3,8"
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="1.6"
                strokeLinejoin="miter"
              />
            </svg>
            <div className="leading-none">
              <span
                className="text-xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[var(--color-accent)] transition-colors block"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Poligon
              </span>
              <span
                className="hidden sm:block text-[9px] text-[rgba(10,10,10,0.40)] tracking-wider uppercase mt-0.5"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Polygon for Politics
              </span>
            </div>
          </Link>
          <NavActions />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#F1EEE5] border-t border-[rgba(10,10,10,0.12)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 28 28" aria-hidden="true">
                <polygon points="14,7 21,10 20,18 13,21 7,17 9,10" fill="var(--color-accent)" />
                <polygon
                  points="14,2 25,8 25,20 14,26 3,20 3,8"
                  fill="none"
                  stroke="var(--color-secondary)"
                  strokeWidth="1.6"
                  strokeLinejoin="miter"
                />
              </svg>
              <span className="font-semibold text-[#0A0A0A] text-sm">Poligon</span>
            </div>
            <div className="text-center text-xs text-[rgba(10,10,10,0.55)]">
              <p>Built to spark conversation, not division</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[rgba(10,10,10,0.55)]">
              <Link href="/profiles" className="hover:text-[var(--color-accent)] transition-colors">Profiles</Link>
              <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">About</Link>
              <Link href="/shared" className="hover:text-[var(--color-accent)] transition-colors">Shared with me</Link>
              <Link href="/quiz" className="hover:text-[var(--color-accent)] transition-colors">Take Quiz</Link>
              <Link href="/embed" className="hover:text-[var(--color-accent)] transition-colors">Embed</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
