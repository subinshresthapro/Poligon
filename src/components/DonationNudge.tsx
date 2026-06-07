import Link from "next/link";

interface Props {
  copy: string;
  className?: string;
}

export default function DonationNudge({ copy, className = "" }: Props) {
  return (
    <div className={className}>
      <div className="h-px bg-[rgba(10,10,10,0.09)]" />
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-5">
        <p className="flex-1 text-sm italic text-[rgba(10,10,10,0.42)] text-center sm:text-left leading-relaxed">
          {copy}
        </p>
        <Link
          href="/support"
          className="flex-shrink-0 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-deep)] border border-[rgba(10,10,10,0.18)] hover:border-[var(--color-accent)] px-4 py-2 rounded-full transition-colors whitespace-nowrap"
        >
          Support Poligon
        </Link>
      </div>
    </div>
  );
}
