import type { Metadata } from "next";
import Link from "next/link";
import { SAMPLE_PROFILES } from "@/data/profiles";
import { shapeScore, convictionPercent } from "@/lib/scoring";
import LeanBadge from "@/components/LeanBadge";
import PoligonShape from "@/components/PoligonShape";
import PoliticianShapes from "@/components/PoliticianShapes";
import PoliticianTeaser from "@/components/PoliticianTeaser";

export const metadata: Metadata = {
  title: "Profiles",
  description: "Compare your political shape against candidate profiles and real politician estimates.",
};

export default function ProfilesPage() {
  return (
    <div className="min-h-screen bg-[#E5E0D2]">
      {/* Sample profiles section */}
      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1
              className="text-3xl font-bold text-[#0A0A0A] mb-2"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Sample Political Profiles
            </h1>
            <p className="text-[rgba(10,10,10,0.55)] text-sm max-w-xl mx-auto">
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
              return (
                <Link
                  key={profile.id}
                  href={`/profiles/${profile.id}`}
                  className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
                >
                  <div className="w-full bg-[#E5E0D2] rounded-t-2xl flex items-center justify-center py-4">
                    <PoligonShape scores={profile.scores} size={180} />
                  </div>
                  <div className="px-5 py-4 border-t border-[rgba(10,10,10,0.08)] flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0">
                        <h2 className="font-bold text-[#0A0A0A] group-hover:text-[#5560C8] transition-colors truncate">
                          {profile.name}
                        </h2>
                        <p className="text-xs text-[rgba(10,10,10,0.55)]">{profile.title}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-semibold text-[#5560C8] bg-[#E5E0D2] px-2 py-0.5 rounded-md">
                        {convictionPercent(avg)}%
                      </span>
                    </div>
                    <p className="text-xs text-[rgba(10,10,10,0.55)] mt-2 leading-relaxed line-clamp-2">
                      {profile.description}
                    </p>
                    <p className="text-xs text-[rgba(10,10,10,0.45)] mt-2 flex items-center gap-1.5">
                      Overall: <LeanBadge score={avg} size="sm" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-[rgba(10,10,10,0.55)] mb-4">Want to see your own shape?</p>
            <Link
              href="/quiz"
              className="bg-[#5560C8] hover:bg-[#4450B2] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
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
