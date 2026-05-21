import Link from "next/link";
import { SAMPLE_PROFILES } from "@/data/profiles";
import { shapeScore, scoreLabel } from "@/lib/scoring";
import PoligonShape from "@/components/PoligonShape";
import PoliticianShapes from "@/components/PoliticianShapes";
import PoliticianTeaser from "@/components/PoliticianTeaser";

export default function ProfilesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sample profiles section */}
      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1
              className="text-3xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Sample Political Profiles
            </h1>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Fictional candidate profiles demonstrating how the political shape system
              captures different viewpoints. Click any profile to explore or embed it.
            </p>
          </div>

          {/* Teaser for politician section below */}
          <div className="max-w-xl mx-auto mb-8">
            <PoliticianTeaser />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_PROFILES.map((profile) => {
              const avg = shapeScore(profile.scores);
              const label = scoreLabel(avg);
              return (
                <Link
                  key={profile.id}
                  href={`/profiles/${profile.id}`}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
                >
                  <div className="w-full bg-slate-50 rounded-t-2xl flex items-center justify-center py-4">
                    <PoligonShape scores={profile.scores} size={180} />
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                          {profile.name}
                        </h2>
                        <p className="text-xs text-slate-500">{profile.title}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {avg >= 0 ? "+" : ""}
                        {avg.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                      {profile.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Overall:{" "}
                      <span className="text-slate-600 font-medium">{label}</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 mb-4">Want to see your own shape?</p>
            <Link
              href="/quiz"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </div>

      {/* Real politicians section — gated behind completing the quiz */}
      <PoliticianShapes />
    </div>
  );
}
