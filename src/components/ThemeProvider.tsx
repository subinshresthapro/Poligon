"use client";

/**
 * ThemeProvider — reads ?theme=a|b from the URL, persists to localStorage,
 * and applies data-theme="b" to <html> for Theme B (Persimmon × Cobalt).
 *
 * Usage:
 *   ?theme=b  → activates Theme B, persists it
 *   ?theme=a  → reverts to Theme A, persists it
 *   (no param) → uses whatever is in localStorage (default: Theme A)
 *
 * Share ?theme=b links with testers so they see the alternate palette
 * with their own quiz answers already encoded in the URL.
 */

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ThemeProvider() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlTheme = searchParams.get("theme");

    // If the URL explicitly sets a theme, persist it
    if (urlTheme === "b" || urlTheme === "a") {
      try { localStorage.setItem("poligon-theme", urlTheme); } catch { /* ignore */ }
    }

    const stored = (() => {
      try { return localStorage.getItem("poligon-theme"); } catch { return null; }
    })();

    const active = urlTheme ?? stored ?? "a";
    document.documentElement.dataset.theme = active === "b" ? "b" : "";
  }, [searchParams]);

  return null;
}
