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

  /** True when the link's path matches the current page */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="flex items-center gap-1 sm:gap-1">
      {hasSaved && (
        <Link
          href="/results"
          className={`hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
            isActive("/results")
              ? "text-[#5560C8] bg-[#E5E0D2]"
              : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
          }`}
        >
          <span className="text-base leading-none">⬡</span>
          My Shape
        </Link>
      )}

      <Link
        href="/profiles"
        className={`hidden sm:block text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
          isActive("/profiles")
            ? "text-[#0A0A0A] bg-[#E5E0D2]"
            : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
        }`}
      >
        Profiles
      </Link>

      <Link
        href="/about"
        className={`hidden sm:block text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
          isActive("/about")
            ? "text-[#0A0A0A] bg-[#E5E0D2]"
            : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] hover:bg-[#E5E0D2]"
        }`}
      >
        About
      </Link>

      <Link
        href="/quiz"
        className={`ml-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
          isActive("/quiz")
            ? "bg-[#4450B2] text-white"
            : "bg-[#5560C8] hover:bg-[#4450B2] text-white"
        }`}
      >
        {hasSaved ? "Edit My Answers" : "Take the Quiz"}
      </Link>
    </nav>
  );
}
