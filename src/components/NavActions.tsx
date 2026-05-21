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
          className="hidden sm:flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <span className="text-base">⬡</span>
          My Shape
        </Link>
      )}
      <Link
        href="/profiles"
        className="hidden sm:block text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        Profiles
      </Link>
      <Link
        href="/quiz"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
      >
        {hasSaved ? "Edit My Answers" : "Take the Quiz"}
      </Link>
    </nav>
  );
}
