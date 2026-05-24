"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/about",              label: "What is Poligon" },
  { href: "/about/why",          label: "Why We Built It" },
  { href: "/about/how-it-works", label: "How It Works"    },
  { href: "/about/our-story",    label: "Our Story"       },
] as const;

export default function AboutSubNav() {
  const pathname = usePathname();

  return (
    <div className="bg-[#F1EEE5] border-b border-[rgba(10,10,10,0.10)] sticky top-16 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {ITEMS.map(({ href, label }) => {
            const active =
              href === "/about"
                ? pathname === "/about"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  active
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
