"use client";

import { useState, useEffect } from "react";

const SESSION_KEY = "poligon_geo_state";

interface GeoState {
  /** Two-letter US state code, e.g. "CA". Null if outside US or lookup failed. */
  stateCode: string | null;
  loading: boolean;
  error: boolean;
}

/**
 * Detects the user's US state via IP geolocation (ipapi.co).
 * No browser permission is required — this is purely IP-based.
 * Result is cached in sessionStorage so subsequent renders are instant.
 *
 * Returns null stateCode for non-US visitors or if the lookup fails.
 */
export function useGeoState(): GeoState {
  const [geo, setGeo] = useState<GeoState>({ stateCode: null, loading: true, error: false });

  useEffect(() => {
    // Return cached result immediately if available
    try {
      const cached = sessionStorage.getItem(SESSION_KEY);
      if (cached !== null) {
        setGeo({ stateCode: cached || null, loading: false, error: false });
        return;
      }
    } catch {
      // sessionStorage not available (e.g. private browsing with strict settings)
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        clearTimeout(timeout);
        const code =
          data.country_code === "US" && typeof data.region_code === "string"
            ? data.region_code.toUpperCase()
            : "";
        try { sessionStorage.setItem(SESSION_KEY, code); } catch {}
        setGeo({ stateCode: code || null, loading: false, error: false });
      })
      .catch(() => {
        clearTimeout(timeout);
        try { sessionStorage.setItem(SESSION_KEY, ""); } catch {}
        setGeo({ stateCode: null, loading: false, error: true });
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return geo;
}
