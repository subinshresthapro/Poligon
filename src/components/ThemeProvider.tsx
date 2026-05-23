"use client";

/**
 * ThemeProvider — controls which theme all visitors see by default.
 *
 * ─── How to switch the default for everyone ───────────────────────────────
 *
 *   1. Go to Vercel dashboard → your project → Settings → Environment Variables
 *   2. Set  NEXT_PUBLIC_DEFAULT_THEME  to  "a"  or  "b"
 *   3. Trigger a redeploy (or push any commit) — done.
 *
 *   Locally: add  NEXT_PUBLIC_DEFAULT_THEME=b  to your .env.local
 *
 * ─── Priority order ───────────────────────────────────────────────────────
 *
 *   1. ?theme=a/b/c  in the URL         ← always wins; use for tester links
 *   2. localStorage "poligon-theme"    ← remembers what the visitor last set
 *   3. NEXT_PUBLIC_DEFAULT_THEME env   ← global default you control
 *   4. "a"                             ← hardcoded fallback if env not set
 *
 * ─── Tester links ─────────────────────────────────────────────────────────
 *
 *   /results?scores=<encoded>&theme=b   show Theme B (Persimmon × Cobalt)
 *   /results?scores=<encoded>&theme=c   show Theme C (Vermillion × Cobalt)
 *   /results?scores=<encoded>&theme=a   show Theme A (Indigo × Wine)
 *   /?theme=a                           reset a tester back to Theme A
 */

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Theme = "a" | "b" | "c";

function isValidTheme(v: string | null): v is Theme {
  return v === "a" || v === "b" || v === "c";
}

// Resolved at build time from NEXT_PUBLIC_DEFAULT_THEME env var.
// Change it in Vercel → redeploy to flip the default for all visitors.
const ENV_DEFAULT: Theme = isValidTheme(process.env.NEXT_PUBLIC_DEFAULT_THEME ?? null)
  ? (process.env.NEXT_PUBLIC_DEFAULT_THEME as Theme)
  : "a";

export default function ThemeProvider() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlTheme = searchParams.get("theme");

    // If the URL explicitly sets a theme, persist it to localStorage
    if (isValidTheme(urlTheme)) {
      try { localStorage.setItem("poligon-theme", urlTheme); } catch { /* ignore */ }
    }

    // Resolve active theme: URL > localStorage > env default > "a"
    const stored = (() => {
      try { return localStorage.getItem("poligon-theme"); } catch { return null; }
    })();

    const active: Theme = isValidTheme(urlTheme) ? urlTheme
      : isValidTheme(stored) ? stored
      : ENV_DEFAULT;

    // "a" maps to no data-theme attr (default CSS); "b" and "c" set explicitly
    document.documentElement.dataset.theme = active === "a" ? "" : active;
  }, [searchParams]);

  return null;
}
