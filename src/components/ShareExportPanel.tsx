"use client";

import { useState } from "react";
import { iframeSnippet, jsSnippet } from "@/lib/embed";

interface ShareExportPanelProps {
  scores: Record<string, number>;
  name?: string;
}

type Tab = "share" | "iframe" | "js";

export default function ShareExportPanel({ scores, name }: ShareExportPanelProps) {
  const [tab, setTab] = useState<Tab>("share");
  const [copied, setCopied] = useState(false);

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
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === t.id
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
          {codeMap[tab]}
        </pre>
        <button
          onClick={() => copy(codeMap[tab])}
          className="absolute top-3 right-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {tab === "share" && (
        <p className="text-xs text-slate-500">
          Share this link to let others view your political shape. The data is encoded in the URL — no account needed.
        </p>
      )}
      {tab === "iframe" && (
        <p className="text-xs text-slate-500">
          Paste this into any webpage to embed the political shape widget. Works on news sites, candidate profiles, and blogs.
        </p>
      )}
      {tab === "js" && (
        <p className="text-xs text-slate-500">
          Drop this script anywhere on your page. It dynamically creates the embed widget in the target container.
        </p>
      )}
    </div>
  );
}
