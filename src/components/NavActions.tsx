"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { hasSavedScores } from "@/lib/storage";

export default function NavActions() {
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    setHasSaved(hasSavedScores());
    // Re-check when window gets focus (user may have completed quiz in another tab)
    const onFocus = () => setHasSaved(hasSavedScores());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <nav className="flex items-center gap-3 sm:gap-5">
      {hasSaved && (
        <Link
          href="/results"
          className="hidden sm:flex items-center gap-1.5 text-sm text-[#5560C8] hover:text-[#4450B2] font-medium transition-colors"
        >
          <span className="text-base">⬡</span>
          My Shape
        </Link>
      )}
      <Link
        href="/profiles"
        className="hidden sm:block text-sm text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] transition-colors"
      >
        Profiles
      </Link>
      <Link
        href="/about"
        className="hidden sm:block text-sm text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A] transition-colors"
      >
        About
      </Link>
      <Link
        href="/quiz"
        className="bg-[#5560C8] hover:bg-[#4450B2] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
      >
        {hasSaved ? "Edit My Answers" : "Take the Quiz"}
      </Link>
    </nav>
  );
}
