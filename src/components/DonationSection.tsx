"use client";

// Set NEXT_PUBLIC_STRIPE_MONTHLY_LINK and NEXT_PUBLIC_STRIPE_ONETIME_LINK in .env.local
// to your Stripe Payment Link URLs before going live.
const STRIPE_MONTHLY = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK ?? "#";
const STRIPE_ONETIME = process.env.NEXT_PUBLIC_STRIPE_ONETIME_LINK ?? "#";

const SUPPORTER_COUNT = 47;

interface DonationSectionProps {
  compact?: boolean;
}

export default function DonationSection({ compact = false }: DonationSectionProps) {
  if (compact) {
    return (
      <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Icon */}
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[var(--color-accent)] rounded-xl">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-0.5">
              Keep Poligon free & independent
            </p>
            <p className="font-bold text-[#0A0A0A] text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
              If this helped you see your politics differently, help someone else do the same.
            </p>
            <p className="text-[rgba(10,10,10,0.50)] text-xs mt-1 leading-relaxed">
              No ads. No investors. {SUPPORTER_COUNT} people keep the lights on. Join them?
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href={STRIPE_MONTHLY}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white flex-shrink-0" aria-hidden="true">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
              $3 / month
            </a>
            <a
              href={STRIPE_ONETIME}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 border border-[rgba(10,10,10,0.18)] text-[rgba(10,10,10,0.70)] hover:text-[#0A0A0A] hover:border-[rgba(10,10,10,0.35)] font-medium text-sm px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap bg-white"
            >
              $10 one-time gift
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Full variant for the /support page
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href={STRIPE_MONTHLY}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center text-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white font-semibold px-6 py-6 rounded-2xl transition-colors group"
      >
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/25 transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>$3 / month</p>
          <p className="text-white/75 text-sm mt-1 leading-snug">
            Recurring support — keeps Poligon ad-free and independent, every month.
          </p>
        </div>
        <span className="mt-auto text-xs font-semibold bg-white/20 rounded-full px-3 py-1">
          Most popular ↗
        </span>
      </a>

      <a
        href={STRIPE_ONETIME}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center text-center gap-3 bg-[#F1EEE5] hover:bg-[#E5E0D2] border border-[rgba(10,10,10,0.12)] text-[#0A0A0A] font-semibold px-6 py-6 rounded-2xl transition-colors group"
      >
        <div className="w-10 h-10 bg-[rgba(10,10,10,0.06)] rounded-xl flex items-center justify-center group-hover:bg-[rgba(10,10,10,0.10)] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0A0A0A]" aria-hidden="true">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>$10 one-time</p>
          <p className="text-[rgba(10,10,10,0.55)] text-sm mt-1 leading-snug">
            A one-off gift — appreciated just as much, no strings attached.
          </p>
        </div>
        <span className="mt-auto text-xs font-semibold text-[rgba(10,10,10,0.45)] bg-[rgba(10,10,10,0.06)] rounded-full px-3 py-1">
          One-time gift ↗
        </span>
      </a>
    </div>
  );
}
