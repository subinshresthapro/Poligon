"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { hasSavedScores } from "@/lib/storage";

export default function NavActions() {
  const [hasSaved, setHasSaved] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasSaved(hasSavedScores());
    const onFocus = () => setHasSaved(hasSavedScores());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

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

      {/* About — visible on all screen sizes */}
      <Link
        href="/about"
        className={`text-sm font-medium px-2 py-1.5 sm:px-3 rounded-lg transition-colors ${
          isActive("/about")
            ? "text-[#0A0A0A] bg-[#E5E0D2]"
            : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
        }`}
      >
        About
      </Link>

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
              ? "bg-[#4450B2] text-white"
              : "bg-[#5560C8] hover:bg-[#4450B2] text-white"
          }`}
        >
          My Poligon
        </Link>
      ) : (
        <Link
          href="/quiz"
          className={`ml-1.5 px-3.5 py-2 sm:px-4 rounded-lg text-sm font-semibold transition-colors ${
            isActive("/quiz")
              ? "bg-[#4450B2] text-white"
              : "bg-[#5560C8] hover:bg-[#4450B2] text-white"
          }`}
        >
          Take the Quiz
        </Link>
      )}
    </nav>
  );
}
