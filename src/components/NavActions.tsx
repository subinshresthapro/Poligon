"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { hasSavedScores } from "@/lib/storage";
import { loadSavedPoligons } from "@/lib/sharedPoligons";

const ABOUT_ITEMS = [
  { href: "/about",              label: "What is Poligon", desc: "The shape, explained"     },
  { href: "/about/why",          label: "Why We Built It",  desc: "The reason this exists"  },
  { href: "/about/how-it-works", label: "How It Works",     desc: "Science behind the shape" },
  { href: "/about/our-story",    label: "Our Story",        desc: "Who built this & why"    },
] as const;

export default function NavActions() {
  const [hasSaved, setHasSaved] = useState(false);
  const [sharedCount, setSharedCount] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasSaved(hasSavedScores());
    setSharedCount(loadSavedPoligons().length);
    const onFocus = () => {
      setHasSaved(hasSavedScores());
      setSharedCount(loadSavedPoligons().length);
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setAboutOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const isAboutActive = ABOUT_ITEMS.some((item) => isActive(item.href));

  return (
    <nav className="flex items-center gap-0.5 sm:gap-1">

      {/* Profiles — visible on all screen sizes */}
      <Link
        href="/profiles"
        className={`text-sm font-medium px-2 py-1.5 sm:px-3 rounded-lg transition-colors ${
          isActive("/profiles")
            ? "text-[#0A0A0A] bg-[#E5E0D2]"
            : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
        }`}
      >
        Profiles
      </Link>

      {/* About — dropdown on hover (desktop) / click (mobile) */}
      <div
        ref={aboutRef}
        className="relative"
        onMouseEnter={() => setAboutOpen(true)}
        onMouseLeave={() => setAboutOpen(false)}
      >
        <button
          onClick={() => setAboutOpen((v) => !v)}
          aria-expanded={aboutOpen}
          aria-haspopup="true"
          className={`flex items-center gap-1 text-sm font-medium px-2 py-1.5 sm:px-3 rounded-lg transition-colors ${
            isAboutActive || aboutOpen
              ? "text-[#0A0A0A] bg-[#E5E0D2]"
              : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
          }`}
        >
          About
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dropdown panel */}
        <div
          className={`absolute right-0 top-full mt-1.5 w-56 bg-white border border-[rgba(10,10,10,0.10)] rounded-xl shadow-lg py-1.5 transition-all duration-150 origin-top-right ${
            aboutOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{ zIndex: 100 }}
        >
          {ABOUT_ITEMS.map(({ href, label, desc }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2.5 transition-colors ${
                  active
                    ? "bg-[#F1EEE5]"
                    : "hover:bg-[#F1EEE5]"
                }`}
              >
                <span
                  className={`block text-sm font-medium ${
                    active ? "text-[#0A0A0A]" : "text-[rgba(10,10,10,0.80)]"
                  }`}
                >
                  {label}
                  {active && (
                    <span
                      className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle"
                      style={{ background: "var(--color-accent)", marginBottom: "2px" }}
                    />
                  )}
                </span>
                <span className="block text-xs text-[rgba(10,10,10,0.42)] mt-0.5">
                  {desc}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Shared with me — only shown when collection has entries */}
      {sharedCount > 0 && (
        <Link
          href="/shared"
          className={`relative text-sm font-medium px-2 py-1.5 sm:px-3 rounded-lg transition-colors ${
            isActive("/shared")
              ? "text-[#0A0A0A] bg-[#E5E0D2]"
              : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
          }`}
        >
          Shared
          <span
            className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-white px-1"
            style={{ background: "var(--color-accent)" }}
          >
            {sharedCount}
          </span>
        </Link>
      )}

      {/* Edit answers — desktop only, muted, only shown when quiz is complete */}
      {hasSaved && (
        <Link
          href="/quiz"
          className={`hidden sm:block text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
            isActive("/quiz")
              ? "text-[rgba(10,10,10,0.65)] bg-[#E5E0D2]"
              : "text-[rgba(10,10,10,0.38)] hover:text-[rgba(10,10,10,0.60)] hover:bg-[#E5E0D2]"
          }`}
        >
          Edit answers
        </Link>
      )}

      {/* Primary CTA — "My Poligon" when quiz taken, "Take the Quiz" when not */}
      {hasSaved ? (
        <Link
          href="/results"
          className={`ml-1.5 px-3.5 py-2 sm:px-4 rounded-lg text-sm font-semibold transition-colors ${
            isActive("/results")
              ? "bg-[var(--color-accent-deep)] text-white"
              : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white"
          }`}
        >
          My Poligon
        </Link>
      ) : (
        <Link
          href="/quiz"
          className={`ml-1.5 px-3.5 py-2 sm:px-4 rounded-lg text-sm font-semibold transition-colors ${
            isActive("/quiz")
              ? "bg-[var(--color-accent-deep)] text-white"
              : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white"
          }`}
        >
          Take the Quiz
        </Link>
      )}
    </nav>
  );
}
