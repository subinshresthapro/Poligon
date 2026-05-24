"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PoligonShape from "@/components/PoligonShape";
import {
  loadSavedPoligons,
  removeSavedPoligon,
  updateSavedPoligonName,
  computeAgreement,
  type SavedPoligon,
} from "@/lib/sharedPoligons";
import { loadScores } from "@/lib/storage";
import { findArchetype } from "@/lib/archetypes";

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 2) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

// ── Card ───────────────────────────────────────────────────────────────────────

function SharedCard({
  entry,
  ownScores,
  onRemove,
  onRename,
}: {
  entry: SavedPoligon;
  ownScores: Record<string, number> | null;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const archetype = findArchetype(entry.scores);
  const agreement = ownScores ? computeAgreement(ownScores, entry.scores) : null;

  const startEdit = () => {
    setDraft(entry.name);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== entry.name) onRename(entry.id, trimmed);
    setEditing(false);
  };

  return (
    <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.10)] rounded-2xl p-4 flex gap-4 items-start hover:shadow-sm transition-shadow">
      {/* Shape thumbnail */}
      <Link
        href={entry.sourceUrl}
        className="flex-shrink-0 bg-[#E5E0D2] rounded-xl p-2 block hover:opacity-90 transition-opacity"
        title={`View ${entry.name}'s shape`}
      >
        <PoligonShape scores={entry.scores} size={110} />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        {/* Name — editable inline */}
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="text-[17px] font-bold text-[#0A0A0A] bg-[#E5E0D2] border border-[var(--color-accent)] rounded-lg px-2 py-0.5 w-full outline-none"
            style={{ fontFamily: "var(--font-outfit)" }}
          />
        ) : (
          <button
            onClick={startEdit}
            className="text-[17px] font-bold text-[#0A0A0A] hover:text-[var(--color-accent)] transition-colors leading-tight truncate max-w-full text-left group/name flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-outfit)" }}
            title="Click to rename"
          >
            <span className="truncate">{entry.name}</span>
            <span className="text-[rgba(10,10,10,0.28)] text-xs opacity-0 group-hover/name:opacity-100 transition-opacity flex-shrink-0">
              ✏
            </span>
          </button>
        )}

        {/* Archetype label */}
        <p className="text-xs text-[rgba(10,10,10,0.50)] mt-0.5 leading-snug truncate">
          {archetype.emoji} {archetype.name}
        </p>

        {/* Agreement badge */}
        <div className="mt-2.5">
          {agreement !== null ? (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `color-mix(in srgb, var(--color-accent) 12%, transparent)`,
                color: "var(--color-accent)",
              }}
            >
              🤝 {agreement}% agreement with you
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[rgba(10,10,10,0.38)] px-2.5 py-1 rounded-full bg-[rgba(10,10,10,0.05)]">
              Take the quiz to see agreement %
            </span>
          )}
        </div>

        {/* Actions + timestamp */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Link
            href={entry.sourceUrl}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            View shape →
          </Link>
          <button
            onClick={() => onRemove(entry.id)}
            className="px-2.5 py-1.5 text-[11px] text-[rgba(10,10,10,0.38)] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Remove
          </button>
          <span className="text-[10px] text-[rgba(10,10,10,0.28)] ml-auto">
            {timeAgo(entry.savedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SharedPage() {
  const [entries, setEntries] = useState<SavedPoligon[]>([]);
  const [ownScores, setOwnScores] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    setEntries(loadSavedPoligons());
    setOwnScores(loadScores());
  }, []);

  const handleRemove = (id: string) => {
    removeSavedPoligon(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleRename = (id: string, name: string) => {
    updateSavedPoligonName(id, name);
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, name } : e))
    );
  };

  return (
    <div className="min-h-screen bg-[#E5E0D2] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1
                className="text-2xl font-bold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Shapes shared with me
              </h1>
              <p className="text-sm text-[rgba(10,10,10,0.50)] mt-1">
                {entries.length === 0
                  ? "Poligons will appear here once saved from a shared link."
                  : `${entries.length} shape${entries.length !== 1 ? "s" : ""} saved`}
              </p>
            </div>
            {!ownScores && (
              <Link
                href="/quiz"
                className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-deep)] text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0"
              >
                Take the quiz →
              </Link>
            )}
          </div>

          {/* No-own-scores note */}
          {!ownScores && entries.length > 0 && (
            <div className="mt-4 bg-[#F1EEE5] border border-[rgba(10,10,10,0.10)] rounded-xl px-4 py-3 text-xs text-[rgba(10,10,10,0.55)]">
              💡 <strong>Take the quiz</strong> to see how much you agree with each saved shape.
            </div>
          )}
        </div>

        {/* Empty state */}
        {entries.length === 0 && (
          <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.10)] rounded-2xl px-6 py-14 text-center">
            <div className="text-5xl mb-4 opacity-60">🔗</div>
            <h2
              className="text-lg font-semibold text-[#0A0A0A] mb-2"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              No shapes saved yet
            </h2>
            <p className="text-sm text-[rgba(10,10,10,0.55)] max-w-xs mx-auto leading-relaxed">
              When someone shares their Poligon link with you, open it and
              you&apos;ll be asked to give it a name and save it here.
            </p>
          </div>
        )}

        {/* Cards grid */}
        {entries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <SharedCard
                key={entry.id}
                entry={entry}
                ownScores={ownScores}
                onRemove={handleRemove}
                onRename={handleRename}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
