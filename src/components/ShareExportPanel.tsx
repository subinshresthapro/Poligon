"use client";

import { useState } from "react";
import { iframeSnippet, jsSnippet } from "@/lib/embed";
import { exportPoligonPNG } from "@/components/PoliticalRadarChart";

interface ShareExportPanelProps {
  scores: Record<string, number>;
  name?: string;
}

type Tab = "share" | "iframe" | "js";

export default function ShareExportPanel({ scores, name }: ShareExportPanelProps) {
  const [tab, setTab] = useState<Tab>("share");
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://your-domain.com";
  const data = btoa(JSON.stringify({ name, scores }));
  const shareUrl = `${origin}/embed?data=${encodeURIComponent(data)}`;
  const resultsUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const iframe = iframeSnippet(shareUrl, name);
  const js = jsSnippet(shareUrl);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadPNG = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const dataUrl = exportPoligonPNG(scores, { size: 600 });
      const link = document.createElement("a");
      link.download = `my-poligon${name ? `-${name.toLowerCase().replace(/\s+/g, "-")}` : ""}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "share", label: "Share Link" },
    { id: "iframe", label: "iFrame Embed" },
    { id: "js", label: "JS Snippet" },
  ];

  const codeMap: Record<Tab, string> = {
    share: resultsUrl,
    iframe,
    js,
  };

  return (
    <div className="space-y-4">
      {/* PNG download button */}
      <div className="flex items-center justify-between bg-[#E5E0D2] rounded-xl px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#0A0A0A]">Download as PNG</p>
          <p className="text-xs text-[rgba(10,10,10,0.50)] mt-0.5">
            600 × 600 px — share on social or save for later
          </p>
        </div>
        <button
          onClick={downloadPNG}
          disabled={exporting}
          className="flex-shrink-0 flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
        >
          {exporting ? "…" : "⬇ PNG"}
        </button>
      </div>

      {/* Code / link tabs */}
      <div className="flex gap-1 bg-[rgba(10,10,10,0.06)] rounded-lg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === t.id
                ? "bg-[#F1EEE5] text-[#0A0A0A] shadow-sm"
                : "text-[rgba(10,10,10,0.55)] hover:text-[#0A0A0A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <pre className="bg-[#0A0A0A] text-slate-100 rounded-xl p-4 text-xs overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
          {codeMap[tab]}
        </pre>
        <button
          onClick={() => copy(codeMap[tab])}
          className="absolute top-3 right-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white text-xs px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {tab === "share" && (
        <p className="text-xs text-[rgba(10,10,10,0.55)]">
          Share this link to let others view your political shape. The data is encoded in the URL — no account needed.
        </p>
      )}
      {tab === "iframe" && (
        <p className="text-xs text-[rgba(10,10,10,0.55)]">
          Paste this into any webpage to embed the political shape widget. Works on news sites, candidate profiles, and blogs.
        </p>
      )}
      {tab === "js" && (
        <p className="text-xs text-[rgba(10,10,10,0.55)]">
          Drop this script anywhere on your page. It dynamically creates the embed widget in the target container.
        </p>
      )}
    </div>
  );
}
