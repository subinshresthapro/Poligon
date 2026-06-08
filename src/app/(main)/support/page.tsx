import Link from "next/link";
import DonationSection from "@/components/DonationSection";

export const metadata = {
  title: "Support Poligon",
  description:
    "Help keep Poligon free, independent, and ad-free. Donor-supported since day one.",
};

// Update these when real numbers are available
const SUPPORTER_COUNT = 47;
const QUIZ_COMPLETIONS = "10,000+";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE5]">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
            Support Poligon
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Independent, non-partisan,
            <br className="hidden sm:inline" /> and built for everyone.
          </h1>
          <p className="text-[rgba(241,238,229,0.65)] text-base leading-relaxed max-w-xl mx-auto">
            No ads. No investors. No partisan funding. Poligon exists because a small group
            of people believe civic technology should serve the public — not any party or
            commercial interest.
          </p>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <div className="bg-[#E5E0D2] border-b border-[rgba(10,10,10,0.10)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          <div>
            <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {SUPPORTER_COUNT}
            </p>
            <p className="text-xs text-[rgba(10,10,10,0.50)] uppercase tracking-widest mt-0.5">supporters</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[rgba(10,10,10,0.12)]" />
          <div>
            <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {QUIZ_COMPLETIONS}
            </p>
            <p className="text-xs text-[rgba(10,10,10,0.50)] uppercase tracking-widest mt-0.5">quizzes taken</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[rgba(10,10,10,0.12)]" />
          <div>
            <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>$0</p>
            <p className="text-xs text-[rgba(10,10,10,0.50)] uppercase tracking-widest mt-0.5">ad revenue</p>
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Mission statement */}
          <div className="mb-10">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-3">
              Why we need your help
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              The core quiz will always be free.
            </h2>
            <div className="space-y-3 text-[rgba(10,10,10,0.65)] text-sm leading-relaxed">
              <p>
                Poligon exists to bridge political divides by helping people see their views
                as a multidimensional shape — not a point on a line. That mission only works
                if the tool is trusted, which means it can never be ad-supported or
                party-funded.
              </p>
              <p>
                Donations from people like you keep Poligon free for everyone. Your $3/month
                covers hosting, the domain, and development time — and it signals to the world
                that civic tech can be independent.
              </p>
              <p className="font-medium text-[#0A0A0A]">
                If this helped you see your politics differently, help someone else do the same.
              </p>
            </div>
          </div>

          {/* Donation CTAs */}
          <div className="mb-12">
            <DonationSection />
            <p className="text-center text-xs text-[rgba(10,10,10,0.40)] mt-3">
              Secure payment via Stripe. Cancel recurring donations any time.
            </p>
          </div>

          {/* Transparency */}
          <div className="bg-[#E5E0D2] border border-[rgba(10,10,10,0.10)] rounded-2xl p-6 mb-10">
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-3">
              Transparency
            </p>
            <h3
              className="text-lg font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              What your money covers
            </h3>
            <ul className="space-y-2.5 text-sm text-[rgba(10,10,10,0.65)]">
              {[
                { label: "Hosting (Vercel)", detail: "Fast, reliable, zero ad network" },
                { label: "Domain (mypoligon.com)", detail: "Baseline credibility, permanent home" },
                { label: "Development time", detail: "Feature work, bug fixes, research" },
                { label: "Free access for everyone", detail: "No paywalls on the core quiz, ever" },
              ].map(({ label, detail }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[var(--color-accent)] flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white" aria-hidden="true">
                      <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>
                    <strong className="text-[#0A0A0A] font-semibold">{label}</strong>
                    {" — "}
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[rgba(10,10,10,0.45)] leading-relaxed">
              We publish a brief quarterly update on how funds were used. We will never show
              total dollar amounts publicly — only supporter counts and what the money went
              toward.
            </p>
          </div>

          {/* What won't change */}
          <div className="border border-[rgba(10,10,10,0.10)] rounded-2xl p-6 bg-[#F1EEE5] mb-10">
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-3">
              Our commitment
            </p>
            <h3
              className="text-lg font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              What will never change
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "The core quiz is free, forever",
                "No ads — ever",
                "No party or ideological funding",
                "No selling your data",
                "No guilt, timers, or dark patterns",
                "No paywalling your results",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[rgba(10,10,10,0.65)]">
                  <span className="text-[var(--color-accent)] font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA footer */}
          <div className="text-center">
            <p className="text-[rgba(10,10,10,0.50)] text-sm mb-6">
              Already took the quiz? Share it with a friend and help grow the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/quiz"
                className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
              >
                Take the quiz →
              </Link>
              <Link
                href="/about"
                className="inline-block border border-[rgba(10,10,10,0.18)] text-[rgba(10,10,10,0.65)] hover:text-[#0A0A0A] hover:border-[rgba(10,10,10,0.35)] font-medium px-6 py-2.5 rounded-xl transition-colors text-sm bg-white"
              >
                About Poligon
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
